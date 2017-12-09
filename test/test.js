"use strict";

const grunt = require("grunt");
const InlineImport = require("../build/inline-import.js");

const options = {
	extensions: {
		".frag": "utf8",
		".vert": "utf8",
		".png": "base64"
	}
};

const EOL = /(?:\\r\\n|\\r|\\n)/g;

module.exports = {

	"Inline Import": {

		"basic inlining and filtering": function(test) {

			test.expect(1);

			InlineImport.transform("test/inline/a/index.js", options).then(() => {

				const actual = grunt.file.read("test/inline/a/index.js").replace(EOL, "");
				const expected = grunt.file.read("test/expected/a");

				test.equal(actual, expected);
				test.done();

			}).catch((error) => {

				console.error(error);
				test.done();

			});

		},

		"ignores unrelated imports": function(test) {

			test.expect(1);

			InlineImport.transform("test/inline/b/index.js", options).then(() => {

				const actual = grunt.file.read("test/inline/b/index.js").replace(EOL, "");
				const expected = grunt.file.read("test/expected/b");

				test.equal(actual, expected);
				test.done();

			}).catch((error) => {

				console.error(error);
				test.done();

			});

		},

		"inlines image files": function(test) {

			test.expect(1);

			InlineImport.transform("test/inline/c/index.js", options).then(() => {

				const actual = grunt.file.read("test/inline/c/index.js").replace(EOL, "");
				const expected = grunt.file.read("test/expected/c");

				test.equal(actual, expected);
				test.done();

			}).catch((error) => {

				console.error(error);
				test.done();

			});

		}

	}

};
