function Node() {
    const key = null;
    const value = null;
    const nextNode = null;
    return { value, nextNode };
}

function LinkedList() {
    let headNode = new Node();

    const append = (key, value) => {
        const newNode = new Node();
        newNode.key = key;
        newNode.value = value;
        // special case: linked list is empty
        let current = headNode;
        if(current.value==null){
            headNode.value = value;
            headNode.key = key;
            return headNode;
        }
        // base case:
        let tailNode = tail();
        tailNode.nextNode = newNode;
        return newNode;
    }

    const prepend = (key, value) => {
        const newNode = new Node();
        newNode.key = key;
        newNode.value = value;
        if(headNode.value) {
            newNode.nextNode = headNode;
        }
        headNode = newNode;
        return newNode;
    }

    const size = () => {
        let count = 0;
        let current = headNode;
        if(current.value == null) {
            return 0;
        }
        count++;
        while(current.nextNode) {
            current = current.nextNode;
            count++;
        }
        return count;
    }

    const head = () => {
        return headNode;
    }

    const tail = () => {
        let current = headNode;
        while(current.nextNode) {
            current = current.nextNode;
        }
        return current;
    }

    const at = (index) => {
        let current = headNode;
        let count = 0;
        while(count < index) {
            if(current == null)
                return null;
            current = current.nextNode;
            count++;
        }
        return current;
    }

    const toStringKeys = () => {
        let current = headNode;
        
        if(current.key == null) {
            console.log('toString empty list')
            return 'Error: empty list';
        }
        
        let listString = '( ' + current.key + ' )';
        while(current.nextNode) {
            listString += ' -> ( ' + current.nextNode.key + ' )';
            current = current.nextNode;
        }
        listString += ' -> null';
        return listString;
    }

    const toStringValues = () => {
        let current = headNode;
        
        if(current.key == null) {
            console.log('toString empty list')
            return 'Error: empty list';
        }
        
        let listString = '( ' + current.value + ' )';
        while(current.nextNode) {
            listString += ' -> ( ' + current.nextNode.value + ' )';
            current = current.nextNode;
        }
        listString += ' -> null';
        return listString;
    }
    const pop = () => {
        let pop_minus_1 = at(size()-2); //size returns index + 1
        let popped = pop_minus_1.nextNode;
        pop_minus_1.nextNode = null;
        return popped;
    }

    const contains = (key) => {
        let value_index = find(key);
        if(value_index != null)
            return true;
        else   
            return false;
    }

    const find = (key) => {
        let current = headNode;
        let index = 0;

        while(current.nextNode) {
            if(current.key == key)
                return index;
            index++;
            current = current.nextNode;
        }
        if(current.key == key)
            return index;
        return null;
    }

    // const insertAt = (value, index) => {
    //     if(index == 0) {
    //         return prepend(value);
    //     }
        
    //     let node_prior = at(index-1);
    //     if(node_prior) {
    //         let newNode = new Node();
    //         newNode.value = value;
    //         newNode.nextNode = node_prior.nextNode;
    //         node_prior.nextNode = newNode;
    //         return newNode;
    //     }
    //     else 
    //         return 'error: index out of bound'
    // }

    const removeAt = (index) => {
        if(index == 0) {
            let removed = headNode;
            headNode = headNode.nextNode;
            if(headNode == null) {
                headNode = new Node();
            }
            return headNode;
        }
        
        let node_prior = at(index-1);
        if(node_prior) {
            let removed = node_prior.nextNode;
            node_prior.nextNode = removed.nextNode;
            return removed;
        }
        else 
            return 'error: index out of bound'
    }

    return {append, prepend, size, toStringKeys, toStringValues, head, tail, at, pop, contains, find, removeAt};
}

export default LinkedList;