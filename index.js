
// M - modules registry
var M = {
    //log:console.log.bind(console) // output in console
    log:function(){ // output in html

        var arg = Array.prototype.slice.call(arguments,0);
        document.write('<p><pre>' + arg.join(' ') + '</pre></p>');
    }
};

M.intersect = (function () {
    /**
     * Find item index, if result -1 then val not present in arr
     * @param {T} val Search element
     * @param {Array} arr
     * @returns {number}
     */
    function find(val, arr) {
        var i = 0, l = arr.length;
        do {
            if (arr[i] == val) {
                return i;
            }
        } while (i++ < l);
        return -1;
    }

    /**
     * intersect arr1 and arr2
     * @param {Array} arr1
     * @param {Array} arr2
     * @returns {Array}
     */
    function intersect(arr1, arr2) {
        var result = [],
            i = 0;
        do {
            if (find(arr2[i], arr1) >= 0) {
                result[++result.length - 1] = arr2[i];
            }
        } while (++i < arr2.length);
        return result;
    }


    return intersect;
})();

M.equal = (function () {

    /**
     *
     * @param {Array} arr1
     * @param {Array} arr2
     * @returns {boolean}
     */
    function equalArr(arr1, arr2) {
        var l1 = arr1.length, l2 = arr2.length, i = 0;

        if (l1 === l2) {
            do {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            } while (++i < l1);
            return true;
        }
        return false;
    }
    return {
        arr: equalArr
    }
})();

M.findLongestSubset = (function(){

    /**
     *
     * @param f fragment length
     * @param arr array of symbols
     * @returns {String|Boolean}
     */

    function findSubsetsByLength(f,arr){
        var a = arr,
            str = a.join(''),
            t = a.length - f, // maximum parts of f(fragment)
            i = 0;
        do{
            var subset = a.slice(i, i + f).join('');
            if (str.indexOf(subset,i+1)>=0){
                return subset;
            }
        } while (++i<t);
        return false;
    }


    /**
     *
     * @param arr Array of chars
     * @returns {Array}
     */
    function findLongestSubset(arr){
        var i = 1,
            lastResult = [],
            result;
        do{
            result = findSubsetsByLength(i,arr);
            if(!result){
                return lastResult;
            } else {
                lastResult = result.split('');
            }
        } while (++i < arr.length);
        return lastResult;
    }

     return findLongestSubset


})();


M.test = (function(intersect,equal) {
    return function test(){

        M.log('\n\n *** Test 1 *** \nUsing javascript, implement an efficient solution to find the intersection of two given arrays.');
        M.log('You cannot use any built-in array functions. Please specify the complexity of your solution.\n');
        var a = [5, 3, 4, 1, 2],
            b = [9, 7, 1, 8, 3];

        M.log('Input: \n');
        M.log('a = [', a.join(),']');
        M.log('b = [', b.join(),']');

        var result = intersect(a, b);

        M.log('\nresult [', result.join(), '] should be "[ 1,3 ]"\n');
        if(!equal.arr(result,[1,3])){
            M.log('Assertion error','Should be [ 1,3 ]\n')
        } else {
            M.log('Ok')
        }
        M.log('--------------------------');

    }
})(M.intersect, M.equal);


M.test2 = (function(findLongestSubset,equal) {
    return function test(){

        M.log('\n\n *** Test 2 *** \nUsing javascript, find the longest repeated subset of array elements in given array.');
        var a = ['b','r','o','w','n','f','o','x','h','u','n','t','e','r','n','f','o','x','r','y','h','u','n'];

        M.log('Input: \n');
        M.log('a = [', a.join(),']\n');
        var result = findLongestSubset(a);


        M.log('result [', result.join(), '] should be "[ n,f,o,x ]"');
        if(!equal.arr(result,['n','f','o','x'])){
            M.log('Assertion error','Should be [n,f,o,x]\n')
        } else {
            M.log('Ok')
        }
        M.log('--------------------------');
    }
})(M.findLongestSubset,M.equal);

M.test();
M.test2();