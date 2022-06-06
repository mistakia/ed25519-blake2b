{
  "targets": [
    {
      "target_name": "ed25519_blake2b",
      "sources": [
        "main.cc",
        "ed25519-donna/ed25519.c",
        "blake2/blake2b.c"
      ],
      "include_dirs": ["<!(node -e \"require('napi-macros')\")"]
    }
  ]
}
