# Save as rename-videos-by-res.ps1 and run in the target folder (pwsh)
# Requires: ffprobe (from FFmpeg) available in PATH

# --- Config ---
$videoExtensions = @(".mp4", ".mov", ".mkv", ".avi", ".flv", ".webm", ".wmv")
$forceMp4 = $true   # If $true, final files will have .mp4 extension (per your request)
# ----------------

# Check ffprobe
$ffprobeCmd = (Get-Command ffprobe -ErrorAction SilentlyContinue)
if (-not $ffprobeCmd) {
    Write-Error "ffprobe not found in PATH. Install FFmpeg or add ffprobe to PATH and re-run."
    return
}

# Get video files in current directory (non-recursive)
$files = Get-ChildItem -File | Where-Object { $videoExtensions -contains $_.Extension.ToLower() }

if ($files.Count -eq 0) {
    Write-Host "No video files with known extensions found in current directory."
    return
}

foreach ($file in $files) {
    try {
        # Call ffprobe properly to get width x height (e.g. "1920x1080")
        $args = @(
            '-v', 'error',
            '-select_streams', 'v:0',
            '-show_entries', 'stream=width,height',
            '-of', 'csv=p=0:s=x',
            '-i', $file.FullName
        )
        $resolution = & $ffprobeCmd.Path @args 2>$null
        $resolution = $resolution -as [string]
        if ([string]::IsNullOrWhiteSpace($resolution)) {
            Write-Warning "Skipping '$($file.Name)' — ffprobe returned no video stream or couldn't read resolution."
            continue
        }

        # Validate and split resolution
        if ($resolution -notmatch '^\s*(\d+)x(\d+)\s*$') {
            Write-Warning "Skipping '$($file.Name)' — unexpected ffprobe output: '$resolution'"
            continue
        }
        $width = $Matches[1]
        $height = $Matches[2]

        # Build base name (without last extension)
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)

        # If already has ".W_H" suffix (before extension) — skip
        if ($baseName -match "\.\d+_\d+$") {
            Write-Host "Skipping '$($file.Name)' — already has resolution suffix."
            continue
        }

        # Construct new name: base.W_H.mp4 (or keep original extension if you prefer)
        if ($forceMp4) {
            $newExt = ".mp4"
        }
        else {
            $newExt = $file.Extension
        }
        $candidateName = "$baseName.$width" + "_$height$newExt"
        $candidatePath = Join-Path $file.DirectoryName $candidateName

        # If candidate exists, add numeric counter to avoid overwrite
        $counter = 1
        while (Test-Path $candidatePath) {
            $candidateName = "$baseName.$width" + "_$height`_$counter$newExt"
            $candidatePath = Join-Path $file.DirectoryName $candidateName
            $counter++
        }

        # Perform rename
        Rename-Item -LiteralPath $file.FullName -NewName $candidateName -ErrorAction Stop
        Write-Host "Renamed: '$($file.Name)' -> '$candidateName'"
    }
    catch {
        Write-Warning "Failed to process '$($file.Name)': $_"
    }
}
