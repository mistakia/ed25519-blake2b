#include <node_api.h>
#include <napi-macros.h>

#include "ed25519-donna/ed25519.h"
#include "blake2/blake2.h"

NAPI_METHOD(node_publickey) {
  NAPI_ARGV(2)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, secret_key, 0)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, public_key, 1)

  ed25519_publickey(secret_key, public_key);
  return NULL;
}

NAPI_METHOD(node_sign) {
  NAPI_ARGV(4)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, message, 0)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, secret_key, 1)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, public_key, 2)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, signature, 3)

  if (public_key_len != 32) {
    napi_throw_error(env, "EINVAL", "public key must be 32 bytes");
    return NULL;
  }

  if (secret_key_len != 32) {
    napi_throw_error(env, "EINVAL", "secret key must be 32 bytes");
    return NULL;
  }

  ed25519_sign(message, message_len, secret_key, public_key, signature);
  return NULL;
}

NAPI_METHOD(node_verify) {
  NAPI_ARGV(3)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, signature, 0)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, message, 1)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, public_key, 2)

  if (signature_len != 64) {
    napi_throw_error(env, "EINVAL", "signature key must be 64 bytes");
    return NULL;
  }

  if (public_key_len != 32) {
    napi_throw_error(env, "EINVAL", "public key must be 32 bytes");
    return NULL;
  }

  int res = ed25519_sign_open(message, message_len, public_key, signature);
  NAPI_RETURN_UINT32(res)
}

NAPI_METHOD(node_hash) {
  NAPI_ARGV(2)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, message, 0)
  NAPI_ARGV_BUFFER_CAST(unsigned char *, output, 1)

  blake2b(output, 32, message, message_len, NULL, 0);
  return NULL;
}

NAPI_INIT() {
  NAPI_EXPORT_FUNCTION(node_sign)
  NAPI_EXPORT_FUNCTION(node_verify)
  NAPI_EXPORT_FUNCTION(node_publickey)
  NAPI_EXPORT_FUNCTION(node_hash)
}
