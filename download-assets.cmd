@echo off
REM Download semua aset dari Figma ke public\assets
REM Link Figma ini berlaku 7 hari (sampai ~3 Des 2026).

setlocal
set P=https://www.figma.com/api/mcp/asset/e9456a44-c65b-43e9-b451-1ac9f77eeee7
set D=%~dp0public\assets
if not exist "%D%" mkdir "%D%"

curl -sSL -o "%D%\chevron-down.svg"             %P%/053af.svg
curl -sSL -o "%D%\chevron-up.svg"               %P%/a1d5d.svg
curl -sSL -o "%D%\dropdown-preview.png"         %P%/7b343.png
curl -sSL -o "%D%\fastwork.png"                 %P%/f09a1.png
curl -sSL -o "%D%\team-1.png"                   %P%/93152.png
curl -sSL -o "%D%\team-2.png"                   %P%/f618a.png
curl -sSL -o "%D%\project-kala-living.png"      %P%/47150.png
curl -sSL -o "%D%\project-aurora-rebrand.png"   %P%/dfb2b.png
curl -sSL -o "%D%\project-fintra-dashboard.png" %P%/21120.png
curl -sSL -o "%D%\project-ritme-music.png"      %P%/891cc.png
curl -sSL -o "%D%\project-sora-skincare.png"    %P%/8a7a1.png
curl -sSL -o "%D%\project-nomad-coffee.png"     %P%/2e23f.png
curl -sSL -o "%D%\logo-mark.svg"                %P%/61d36.svg
curl -sSL -o "%D%\app-0924.svg"                 %P%/0e14f.svg
curl -sSL -o "%D%\app-1914.svg"                 %P%/9cde1.svg
curl -sSL -o "%D%\app-0132.svg"                 %P%/32169.svg
curl -sSL -o "%D%\app-2310.svg"                 %P%/a0eb7.svg
curl -sSL -o "%D%\app-0528.svg"                 %P%/372c6.svg
curl -sSL -o "%D%\app-2904.svg"                 %P%/db36e.svg
curl -sSL -o "%D%\signature.svg"                %P%/65d40.svg
curl -sSL -o "%D%\stars.svg"                    %P%/e0a32.svg
curl -sSL -o "%D%\tail-left.svg"                %P%/906e2.svg
curl -sSL -o "%D%\tail-right.svg"               %P%/0d22e.svg
curl -sSL -o "%D%\arrow.svg"                    %P%/dcfb3.svg

echo.
echo Selesai. Cek folder: %D%
dir /b "%D%"
endlocal
