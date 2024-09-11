# Shamir's Secret Sharing

A JS/TS implementation of Shamir's Secret Sharing in a finite field GF(2^8).

### Example

```typescript
import { split, reconstruct } from "@tanle/shamirs-secret-sharing/sss-28";

// No limit the length of the secret as GF(2^8) works over each byte
const secretStr = "helloworld";
const secret = new Uint8Array(Buffer.from(secretStr, "utf-8"));

const threshold = 2; // must be in [0, 255]
const numShares = 2; // must be in [0, 255]
const shares = split(secret, threshold, numShares);

const reSecret = reconstruct(shares);

const reSecretStr = Buffer.from(reSecret).toString("utf-8");

console.log(secretStr, reSecretStr);
```

### References

- [Shamir's secret sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing)
- [Finite field arithmetic](https://en.wikipedia.org/wiki/Finite_field_arithmetic)
- [Hashicorp Vault implementation](https://github.com/hashicorp/vault/blob/main/shamir/shamir.go)
