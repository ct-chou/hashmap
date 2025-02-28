import LinkedList from './linked_list.mjs';

function HashMap (capacity_input, load_factor_input) {
    const load_factor = load_factor_input;  // grow capacity whenever entries > capacity * load_factor
    let capacity = capacity_input;  // total number of buckets
    let size = 0;
    let buckets = [];

    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for(let i=0; i< key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    const rangeCheck = (index) => {
        if (index < 0 || index >= capacity) {
            throw new Error("Trying to access index out of bounds");
          }
    }

    const expandCapacity = () => {
        // grab all entries array
        // clear existing array/buckets
        // set capacity to new level
        // iterate over entries array to add into new array/buckets
        const allEntries = entries();
        clear();
        capacity = capacity * 2;
        for(let i=0; i< allEntries.length; i++) {
            // console.log(allEntries[i]);
            for(let j=0; j< allEntries[i].length; j++) {
                set(allEntries[i][j][0], allEntries[i][j][1]);
            }
            
        }
    }

    const checkCapacityUsage = () => {
        if(size > (capacity * load_factor)) {
            console.log('size is above capacity');
            expandCapacity();
        }
        return size/capacity;
    }

    const set = (key, value) => {
        const index = hash(key) % capacity;
        if(buckets[index] == null) {
            const newList = LinkedList();
            newList.append(key, value);
            buckets[index] = newList;
            size += 1;
            checkCapacityUsage();
        }
        else {
            // const index_list = buckets[index].find(key);
            const targetNode = buckets[index].at(buckets[index].find(key));
            if(targetNode == null) {
                buckets[index].append(key, value);
                size += 1;
                checkCapacityUsage();
            }
            else {
                targetNode.value = value;  //existing key, update with new value
            }
        }
    }

    const get = (key) => {
        const bucket = find_bucket(key);
        if(bucket == null)
            return null;
        const index_linked_list = find_index(key, bucket);
        if(index_linked_list == null)
            return null;
        const targetNode = bucket.at(index_linked_list);
        if(targetNode == null) {
            return null;
        }
        else {
            console.log('get: ' + targetNode.value);
            return targetNode.value;
        }
    }

    const find_bucket = (key) => {
        const index = hash(key) % capacity;
        rangeCheck(index);
        const bucket = buckets[index];
        
        if(bucket == null) {
            console.log(key + ' not found');
            return null;
        }
        return bucket;
    }

    const find_index = (key, bucket) => {
        const index_linked_list = bucket.find(key);
        if(index_linked_list == null) {
            console.log(key + ' not found');
            return null;
        }
        return index_linked_list;
    }


    const has = (key) => {
        const bucket = find_bucket(key);
        if(bucket == null)
            return false;
        const index_linked_list = find_index(key, bucket);
        if(index_linked_list == null)
            return false;
        else
            return true;
    }

    const remove = (key) => {
        const bucket = find_bucket(key);
        if(bucket == null)
            return false;
        const index_linked_list = find_index(key, bucket);
        if(index_linked_list == null) {
            return false;
        }
        else {
            bucket.removeAt(index_linked_list);
            console.log('removing: ' + key);
            size -= 1;
            return true;
        }
    }

    const length = () => {
        return size;
    }

    const clear = () => {
        buckets = [];
        size = 0;
    }

    const values = () => {
        let stringValues = '';

        for (let i=0; i<capacity; i++) {
            if(buckets[i] != null)
                stringValues += buckets[i].toStringValues() + ',';
        }
        // convert comma delimited values to an array
        if(stringValues == null)
            return null;
        const array = stringValues.split(',');
        return array.slice(0,-1);
    }

    const keys = () => {
        let stringKeys = '';

        for (let i=0; i<capacity; i++) {
            if(buckets[i] != null)
                stringKeys += buckets[i].toStringKeys() + ',';
        }
        // convert comma delimited values to an array
        if(stringKeys == null)
            return null;
        const array = stringKeys.split(',');
        return array.slice(0,-1);
        
    }

    const entries = () => {
        let arrayEntries = [];
        // convert comma delimited values to an array
        for (let i=0; i<capacity; i++) {
            if(buckets[i] != null)
                arrayEntries.push(buckets[i].toArrayEntries());
        }
        return arrayEntries;
    }


    return {set, get, has, remove, length, clear, values, keys, entries, checkCapacityUsage} 
}


const test = HashMap(16, 0.75);
// test.set('apple','red');
// test.get('apple');
// test.set('apple','green');
// test.get('apple');
// test.set('pumpkin','red');
// test.get('pumpkin');
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black');
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log('total entries: ' + test.length());
console.log('capacity usage: ' + (test.checkCapacityUsage()));
console.log('all entries:');
console.log(test.entries());
test.set('grape', 'red')
test.set('ice cream', 'black')
console.log('total entries: ' + test.length());
console.log('all entries:');
console.log(test.entries());
test.set('moon', 'silver');
console.log('total entries: ' + test.length());
console.log('all entries:');
console.log(test.entries());
test.set('lion', 'magenta');
console.log('total entries: ' + test.length());
console.log('all entries:');
console.log(test.entries());

// console.log('all values: ');
// console.log(test.values());
// console.log('all keys:');
// console.log(test.keys());


// console.log('testing has function:')

// test.remove('pumpkin');
// console.log('has apple: ' +test.has('apple'));

// console.log('has pumpkin: ' + test.has('pumpkin'));
// console.log('has green: ' +test.has('green'));
// console.log('total keys stored: ' + test.length());
// console.log('clearing all keys: ');
// test.clear();
// console.log(test.has('apple'));
// console.log('total keys stored: ' + test.length());
