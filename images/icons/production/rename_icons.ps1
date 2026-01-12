Get-ChildItem -Filter *.svg | ForEach-Object {
    $newName = $_.BaseName + "-black-icon" + $_.Extension
    Rename-Item -Path $_.FullName -NewName $newName
}