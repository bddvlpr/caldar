{
  mkPnpmPackage,
  lib,
}: let
  inherit (builtins.fromJSON (builtins.readFile ./package.json)) name version;
in
  mkPnpmPackage {
    inherit name version;

    src = ./.;

    distDir = ".vercel/output";

    meta = with lib; {
      homepage = "https://github.com/bddvlpr/caldar";
      license = licenses.mit;
      maintainers = with maintainers; [bddvlpr];
    };
  }
