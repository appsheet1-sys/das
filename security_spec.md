# Security Specification for Dasrialdi Portfolio Applet

This document details the security model, invariants, and threat matrix for Firestore Collections used in the personal portfolio applet.

## 1. Data Invariants

### Collection: `/biodata/{docId}`
- A biodata document must keep `docId == 'info'`.
- Only the specific validated Google Account (`appsheet1@atim.ac.id`) can write to biodata.
- Any reader (public, unauthenticated) can view the biodata.
- Critical inputs like `nama`, `pendidikanTerakhir`, `jabatan`, and `tahunMasuk` must exist, with length constraints on text fields to prevent payload exhaustion attacks.

### Collection: `/portfolioItems/{itemId}`
- Dynamic portfolio achievements/items linked to the career profile.
- Only the validated Google Account (`appsheet1@atim.ac.id`) can write, update, or delete items.
- Public read access is allowed to display items on any device.
- Input data must have strict types (e.g. `title` is string, `category` is one of `manajerial` or `aplikasi`).

---

## 2. The "Dirty Dozen" Threat Payloads (Permission Denied Tests)

These payloads are designed to challenge and test the constraints of our security rules.

### Collection: `biodata` (Unauthenticated & Unauthorized Writes)

1. **Unauthenticated Public Update**: Attempting to alter the main biodata without being signed in.
   - *Expected Result*: `PERMISSION_DENIED`
2. **Identity Spoofing**: Signed-in user with an arbitrary/external email (e.g. `malicious@attacker.com`) attempting to write to the biodata document.
   - *Expected Result*: `PERMISSION_DENIED`
3. **Email Verification Counterfeit**: Signed-in user with email `appsheet1@atim.ac.id` but where `email_verified == false`.
   - *Expected Result*: `PERMISSION_DENIED`
4. **Invalid Document ID (ID Poisoning)**: Attempting to create a biodata document with a random oversized ID path variable (e.g., `/biodata/randomJunkDocIDPathWithOversizedBytes`) to poison path variables.
   - *Expected Result*: `PERMISSION_DENIED`
5. **Payload Size Flood**: Attempting to inject a multi-megabyte string into the `nama` or `heroSlogan` field to exhaust resources.
   - *Expected Result*: `PERMISSION_DENIED`
6. **Immutable Field Alteration**: Attempting to modify core metadata or immutable fields.
   - *Expected Result*: `PERMISSION_DENIED`

### Collection: `portfolioItems` (Malicious Operations)

7. **Arbitrary Contributor Creation**: Standard public user attempting to insert a new portfolio item under their own authority.
   - *Expected Result*: `PERMISSION_DENIED`
8. **Malicious Property Injection (Shadow Update)**: Attempting to add an unmapped high-privilege property (like `isAdmin: true` or `isVerified: true`) to a portfolio item.
   - *Expected Result*: `PERMISSION_DENIED`
9. **Invalid Range Check**: Creating a portfolio item with a title exceeding 400 characters or containing raw malicious script elements.
   - *Expected Result*: `PERMISSION_DENIED`
10. **Category State Shortcutting**: Creating a portfolio item with a category that does not equal `manajerial` or `aplikasi` (e.g., `category: "super_admin"`).
    - *Expected Result*: `PERMISSION_DENIED`
11. **Orphaned Write / ID Poisoning**: Creating an item with an invalid document ID structure (e.g., containing characters like `%`, `?`, or spacing).
    - *Expected Result*: `PERMISSION_DENIED`
12. **Unauthorized Deletion**: A standard authenticated user attempting to run `deleteDoc()` on an existing portfolio record.
    - *Expected Result*: `PERMISSION_DENIED`

---

## 3. The Test Runner Concept (`DRAFT_firestore.rules` Test Setup)

The validation of rules ensures that the database is mathematically secure against all the described twelve exploits.

```ts
// firestore.rules.test.ts
// Test runners verify that:
// - Public read works across devices without authentication.
// - All non-owner emails or unauthenticated users attempting write actions receive PERMISSION_DENIED.
// - Verified owner (appsheet1@atim.ac.id) can perform all CREATE, UPDATE, DELETE actions successfully.
```
