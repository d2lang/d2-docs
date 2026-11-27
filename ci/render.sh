#!/bin/sh
set -eu
. "$(dirname "$0")/../ci/sub/lib.sh"
cd -- "$(dirname "$0")/.."

_normal() {
  sh_c d2 --omit-version --dark-theme=200 -c --pad 0 ./static/d2/${ex}.d2 ${output_dir}/${ex}.svg2
}


_bespoke() {
  sh_c d2 --omit-version --theme=300 --dark-theme=200 -l elk -c --pad 0 ./static/bespoke-d2/terminal-theme.d2 ${output_dir}/terminal-theme.svg2
  sh_c d2 --omit-version --theme=300 --dark-theme=200 -l elk -c --pad 0 ./static/bespoke-d2/theme-override.d2 ${output_dir}/theme-override.svg2
  sh_c d2 --omit-version --animate-interval=1400 -l elk -c --pad 0 ./static/bespoke-d2/animated.d2 ${output_dir}/animated.svg2
  sh_c d2 --omit-version --animate-interval=1400 -c --pad 0 ./static/bespoke-d2/chicken.d2 ${output_dir}/chicken.svg2
  sh_c d2 --omit-version ./static/bespoke-d2/cache-stampede.d2 ${output_dir}/cache-stampede.svg
  sh_c d2 --omit-version --pad 8 ./static/bespoke-d2/animation-recovery.d2 ${output_dir}/animation-recovery.svg
  sh_c d2 --omit-version --pad 8 ./static/bespoke-d2/animation-battery.d2 ${output_dir}/animation-battery.svg
  for animation_source in ./static/bespoke-d2/animate-*.d2; do
    animation_file=${animation_source##*/}
    sh_c d2 --omit-version --pad 8 "$animation_source" "$output_dir/${animation_file%.d2}.svg"
  done
  for annotation_source in ./static/bespoke-d2/annotation-*.d2; do
    annotation_file=${annotation_source##*/}
    sh_c d2 --omit-version --pad 16 "$annotation_source" "$output_dir/${annotation_file%.d2}.svg"
  done
  sh_c d2 --omit-version --pad 50 ./static/bespoke-d2/tiktok.d2 ${output_dir}/tiktok.pdf
  sh_c d2 --omit-version --pad 0 ./static/bespoke-d2/cat.d2 ${output_dir}/cat.pdf
  sh_c d2 --omit-version --pad 50 ./static/bespoke-d2/lotr.d2 ${output_dir}/lotr.pdf

  sh_c d2 --omit-version --pad 50 ./static/bespoke-d2/c4-code.d2 ${output_dir}/c4.pdf

  sh_c d2 --omit-version --animate-interval=1600 -c --pad 50 -l elk ./static/bespoke-d2/tax.d2 ${output_dir}/tax.svg2
  sh_c d2 --omit-version --animate-interval=1600 -c --pad 0 -l elk ./static/bespoke-d2/pizza.d2 ${output_dir}/pizza.svg2
  sh_c d2 --omit-version --animate-interval=1600 -c --pad 0 -l elk ./static/bespoke-d2/johnwick.d2 ${output_dir}/johnwick.svg2

  sh_c d2 --omit-version --animate-interval=400 -c --pad 0 ./static/bespoke-d2/grid-row-dominant.d2 ${output_dir}/grid-row-dominant.svg2
  sh_c d2 --omit-version --animate-interval=400 -c --pad 0 ./static/bespoke-d2/grid-column-dominant.d2 ${output_dir}/grid-column-dominant.svg2

  sh_c d2 --omit-version ./static/bespoke-d2/cult.d2 ${output_dir}/cult.pptx
  sh_c d2 --omit-version ./static/bespoke-d2/wcc.d2 ${output_dir}/wcc.pptx

  sh_c d2 --omit-version ./static/bespoke-d2/imports-nested.d2 ${output_dir}/imports-nested.pdf

  sh_c d2 --omit-version ./static/bespoke-d2/triple-glob.d2 ${output_dir}/triple-glob.pdf

  sh_c d2 --omit-version --sketch ./static/bespoke-d2/grid-nested-connections.d2 ${output_dir}/grid-nested-connections.svg2

  sh_c d2 --omit-version --dark-theme=200 -l elk -c --pad 0 ./static/bespoke-d2/classes-3.d2 ${output_dir}/classes-3.svg2

  sh_c d2 --omit-version -c --pad 50 ./static/bespoke-d2/styles-animated.d2 ${output_dir}/styles-animated.svg2
}

main() {
  job_parseflags "$@"

  # Set up output directory - use temp dir if no args, direct output if filtered
  if [ $# -eq 0 ]; then
    temp_output_dir=$(mktemp -d)
    trap "rm -rf $temp_output_dir" EXIT
    output_dir="$temp_output_dir"
  else
    output_dir="./static/img/generated"
  fi

  for ex in ./static/d2/*.d2; do
    ex=${ex#./static/d2/}
    ex=${ex%.d2}
    export JOBNAME=$ex
    if ! _runjob_filter; then
      continue
    fi

    bigheader "$ex"
    runjob _normal &
  done
  export JOBNAME='bespoke'
  if  _runjob_filter; then
    runjob _bespoke &
  fi
  waitjobs

  # If no args provided, replace the generated directory with temp directory contents
  if [ $# -eq 0 ]; then
    rm -rf ./static/img/generated/*
    cp "$temp_output_dir"/* ./static/img/generated/
  fi
}

main "$@"
