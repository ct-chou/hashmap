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

    const checkKey = (key) => {

    }

    const set = (key, value) => {
        const index = hash(key) % capacity;
        if(buckets[index] == null) {
            const newList = LinkedList();
            newList.append(key, value);
            buckets[index] = newList;
            size += 1;
        }
        else {
            const targetNode = buckets[index].at(buckets[index].find(key));
            if(targetNode == null) {
                const newList = LinkedList();
                newList.append(key, value);
                buckets[index] = newList;
                size += 1;
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
        let all_values = '';

        for (let i=0; i<capacity; i++) {
            if(buckets[i] != null)
                all_values += buckets[i].toStringValues();
        }
        return all_values;
        
    }

    return {set, get, has, remove, length, clear, values} 
}


const test = HashMap(16, 0.8);
test.set('apple','red');
test.get('apple');
test.set('apple','green');
test.get('apple');
test.set('pumpkin','red');
test.get('pumpkin');
console.log('all values: ' + test.values());
console.log('testing has function:')
test.remove('pumpkin');
console.log('has apple: ' +test.has('apple'));

console.log('has pumpkin: ' + test.has('pumpkin'));
console.log('has green: ' +test.has('green'));
console.log('total keys stored: ' + test.length());
console.log('clearing all keys: ');
test.clear();
console.log(test.has('apple'));
console.log('total keys stored: ' + test.length());
