const cli = require('next/dist/cli/next-start');

cli.nextStart([ '-p', process.env.REACT_ARIA_WIDGETS_PORT || 3000 ]);
