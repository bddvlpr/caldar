{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";

    pnpm2nix.url = "github:nzbr/pnpm2nix-nzbr";
    pnpm2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-darwin"
        "x86_64-linux"
      ];

      perSystem = {
        pkgs,
        inputs',
        ...
      }: {
        formatter = pkgs.alejandra;

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [nodejs nodePackages.pnpm];
        };

        packages = let
          inherit (inputs'.pnpm2nix.packages) mkPnpmPackage;
        in rec {
          caldar = pkgs.callPackage ./. {inherit mkPnpmPackage;};
          default = caldar;
        };
      };
    };
}
