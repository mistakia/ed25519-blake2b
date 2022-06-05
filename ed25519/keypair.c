#include "ed25519.h"
#include "ge.h"
#include "../blake2b/blake2.h"

void ed25519_create_keypair(unsigned char *public_key, unsigned char *private_key, const unsigned char *seed) {
    ge_p3 A;
    blake2b_state hash;

    blake2b_init(&hash, 32);
    blake2b_update(&hash, seed, 32);
    blake2b_final(&hash, private_key, 64);

    private_key[0] &= 248;
    private_key[31] &= 63;
    private_key[31] |= 64;

    ge_scalarmult_base(&A, private_key);
    ge_p3_tobytes(public_key, &A);
}
