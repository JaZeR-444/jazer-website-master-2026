@echo off
echo Canceling stuck GitHub Actions deployment...
echo.
echo Please follow these manual steps:
echo.
echo 1. Go to: https://github.com/JaZeR-444/jazer-website-master-2026/actions
echo.
echo 2. Find the workflow run titled: "Refactor: Migrate to Astro framework and reorganize project structure"
echo    (It should have commit hash starting with bc5dd10)
echo.
echo 3. Click on that workflow run
echo.
echo 4. Look for a "Cancel workflow" button or "..." menu in the top right
echo.
echo 5. Click "Cancel workflow" or "Cancel workflow run"
echo.
echo 6. After cancellation, the newer workflows will automatically deploy
echo.
echo.
echo Alternatively, you can use GitHub CLI if installed:
echo gh run cancel --repo JaZeR-444/jazer-website-master-2026 $(gh run list --repo JaZeR-444/jazer-website-master-2026 --json databaseId,headSha --jq '.[] | select(.headSha | startswith("bc5dd10")) | .databaseId')
echo.
pause
