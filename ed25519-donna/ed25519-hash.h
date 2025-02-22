/*
	a custom hash must have a 512bit digest and implement:

	struct ed25519_hash_context;

	void ed25519_hash_init(ed25519_hash_context *ctx);
	void ed25519_hash_update(ed25519_hash_context *ctx, const uint8_t *in, size_t inlen);
	void ed25519_hash_final(ed25519_hash_context *ctx, uint8_t *hash);
	void ed25519_hash(uint8_t *hash, const uint8_t *in, size_t inlen);
*/

#ifdef BLAKE2_USE_SSE
#include "../blake2/sse/blake2.h"
#else
#include "../blake2/ref/blake2.h"
#endif

typedef blake2b_state ed25519_hash_context;

void ed25519_hash_init (ed25519_hash_context * ctx) {
  blake2b_init (ctx, 64);
}

void ed25519_hash_update (ed25519_hash_context * ctx, uint8_t const * in, size_t inlen) {
  blake2b_update (ctx, in, inlen);
}

void ed25519_hash_final (ed25519_hash_context * ctx, uint8_t * out) {
  blake2b_final (ctx, out, 64);
}

void ed25519_hash (uint8_t * out, uint8_t const * in, size_t inlen) {
  ed25519_hash_context ctx;
  ed25519_hash_init (&ctx);
  ed25519_hash_update (&ctx, in, inlen);
  ed25519_hash_final (&ctx, out);
}
