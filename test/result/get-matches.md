// finds the imports
import test from 'test'
import test2, { test3 } from 'test2'

/* expected */
["test", "test2"]
/**/

// finds the imports with the as
import test, * as test2 from 'test'
import test3, * as test4 from 'test2'

/* expected */
["test", "test2"]
/**/