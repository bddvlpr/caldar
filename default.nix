{
  mkPnpmPackage,
  lib,
}: let
  inherit (builtins.fromJSON (builtins.readFile ./package.json)) name version;
in
  mkPnpmPackage rec {
    inherit name version;

    src = ./.;

    distDir = "build";

    installPhase = ''
      runHook preInstall

      mv ${distDir} $out
      cp package.json $out/

      runHook postInstall
    '';

    meta = with lib; {
      homepage = "https://github.com/bddvlpr/caldar";
      license = licenses.mit;
      maintainers = with maintainers; [bddvlpr];
    };
  }
