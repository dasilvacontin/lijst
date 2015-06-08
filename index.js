function ListNode (value) {
  this.clear()
  this.value = value
}
ListNode.prototype.clear = function () {
  this.prev = undefined
  this.next = undefined
  this.value = undefined
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
function ListIterator (node, reverse) {
  if (!(node instanceof ListNode)) {
    throw new Error('Expecting instance of ListNode as first argument')
  }
  reverse = !!reverse

  var initialNode = {next: node, prev: node, value: undefined}
  node = this._node = initialNode

  /**
   * Step iterator
   */
  this.next = function () {
    this._node = node = node && (reverse && node.prev || node.next)
    return this.current()
  }

  /**
   * Return current element
   */
  this.current = function () {
    this.value = node && node.value
    this.done = !node
    return node ?
      {value: this.value, done: this.done} :
      {done: this.done}
  }

  this.stepped = function () {
    return node !== initialNode
  }
}

function List () {
  this.length = 0
  this.first = undefined
  this.last = undefined
}
exports.List = List

/**
 * Return iterator that iterates list from begin to end
 **/
List.prototype.Iterator = function () {
  return new ListIterator(this.first)
}

/**
 * Return iterator that iterates list from end to begin
 **/
List.prototype.ReverseIterator = function () {
  return new ListIterator(this.last, true)
}

/**
 * Test whether container is empty
 **/
List.prototype.empty = List.prototype.isEmpty = function () {
  return !this.length
}

/**
 * Access first element
 **/
List.prototype.front = function () {
  if (this.first) {
    return this.first.value
  }
}

/**
 * Access last element
 **/
List.prototype.back = function () {
  if (this.last) {
    return this.last.value
  }
}

/**
 * Assign new content to container
 **/
List.prototype.assign = function (arr) {
  if (Array.isArray(arr)) {
    this.clear()
    var self = this
    arr.forEach(function (val) {
      self.push(val)
    })
  }
}

/**
 * Deletes node from list and updates internal first/last references
 **/
List.prototype.popNode = function (node) {
  if (node.prev) {
    node.prev.next = node.next
  }
  if (node.next) {
    node.next.prev = node.prev
  }

  if (this.first === node) {
    this.first = node.next
  }
  if (this.last === node) {
    this.last = node.prev
  }
  --this.length

  node.clear()

  return this
}

/**
 * Insert element at beginning
 **/
List.prototype.pushFront = function (value) {
  var node = new ListNode(value)
  node.next = this.first
  if (this.first) {
    this.first.prev = node
  }
  this.first = node
  if (!this.last) {
    this.last = node
  }
  ++this.length
  return this
}

/**
 * Delete first element and return it
 **/
List.prototype.popFront = function () {
  if (!this.first) {
    return undefined
  }
  var node = this.first
  var value = node.value
  this.popNode(node)
  return value
}

/**
 * Add element at the end
 **/
List.prototype.push = function (value) {
  var node = new ListNode(value)
  node.prev = this.last
  if (this.last) {
    this.last.next = node
  }
  this.last = node
  if (!this.first) {
    this.first = node
  }
  ++this.length
  return this
}
List.prototype.pushBack = List.prototype.push

/**
 * Delete last element and return it
 **/
List.prototype.pop = function () {
  if (!this.last) {
    return undefined
  }
  var node = this.last
  var value = node.value
  this.popNode(node)
  return value
}
List.prototype.popBack = List.prototype.pop

List.prototype.insert = function () {
  throw new Error('Unimplemented')
}

/**
 * Delete current element from list
 **/
List.prototype.erase = function (it) {
  if (!(it instanceof ListIterator)) {
    throw new Error('Expected ListIterator as first argument')
  }
  if (!it.stepped()) {
    throw new Error('Iterator hasn\'t stepped into the list yet')
  }
  var node = it._node
  if (!node) {
    throw new Error('Iterator is done')
  }

  it.next()
  var value = node.value
  this.popNode(node)
  return value
}

/**
 * Clear content
 */
List.prototype.clear = function () {
  var node = this.first
  while (node) {
    var nextNode = node.next
    node.clear()
    node = nextNode
  }
  this.first = undefined
  this.last = undefined
  this.length = 0
}

/**
 * Clone list
 *
 * @return {List} the clone
 **/
List.prototype.clone = function () {
  var list = new List()
  var it = this.Iterator()
  var item = it.next()
  while (!item.done) {
    list.push(item.value)
    item = it.next()
  }
  return list
}

/**
 * The forEach() method executes a provided function once per list element.
 *
 * callback arguments:
 * - currentValue
 * - list
 *
 * @param {Function} callback
 * @return {List} this, for chaining
 */
List.prototype.forEach = function (callback) {
  var it = this.Iterator()
  var item = it.next()
  while (!item.done) {
    callback(item.value, this)
    item = it.next()
  }
  return this
}
