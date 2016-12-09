The following applies to all test cases:

If test case file 'X' includes comment '// REQUIRES <other test case file>',
then test case 'X' will automatically fail.  The only way for the test 'X' to 
pass is if...
    1. the required test file passes its own test case
    2. the test case code is included into test 'X' either by
        inclusion statement or manually inserting the code.

This is done purposely to help minimize possible locations of faulty code
when defects occur, as the individual module functions are assembled 
into a single module.
