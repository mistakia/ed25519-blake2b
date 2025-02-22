{
  "targets": [
    {
      "target_name": "ed25519_blake2b",
      "sources": [
        "main.cc",
        "ed25519-donna/ed25519.c"
      ],
      "conditions": [
        ['target_arch=="x64" or target_arch=="ia32"', {
          "sources": ["blake2/sse/blake2b.c"],
          "defines": ["BLAKE2_USE_SSE"]
        }, {
          "sources": ["blake2/ref/blake2b-ref.c"]
        }]
      ],
      "defines": [
        "OPENSSL_API_COMPAT=0x10100001L"
        # "OPENSSL_CONFIGURED_API=0x30000000L"
      ],
      "include_dirs": ["<!(node -e \"require('napi-macros')\")"]
    }
  ]
}
