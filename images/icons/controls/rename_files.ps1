$files = Get-ChildItem -Path . -Filter *.svg
foreach ($file in $files) {
    $newName = $file.BaseName + "-black-icon" + $file.Extension
    Rename-Item -Path $file.FullName -NewName $newName
}