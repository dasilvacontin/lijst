/* global describe, it, xit, beforeEach */
var chai = require('chai')
var should = chai.should()

var lijst = require('../index.js')
var List = lijst.List

var list

describe('lijst', function () {
  beforeEach(function () {
    list = new List()
  })
  describe('Capacity', function () {
    it('#isEmpty() #empty()', function () {
      list.isEmpty().should.be.true

      list.push('something')
      list.isEmpty().should.be.false

      list.pop()
      list.isEmpty().should.be.true
    })

    it('#length', function () {
      list.length.should.equal(0)

      list.push('something')
      list.length.should.equal(1)

      list.push('else')
      list.length.should.equal(2)

      list.pop()
      list.pop()
      list.length.should.equal(0)
    })
  })

  describe('Element access', function () {
    it('#front()', function () {
      should.not.exist(list.front())

      var val = 42
      list.push(val)
      list.front().should.equal(val)

      val = 21
      list.pushFront(21)
      list.front().should.equal(val)

      list.pop()
      list.pop()
      should.not.exist(list.front())
    })

    it('#back()', function () {
      should.not.exist(list.back())

      var val = 42
      list.pushFront(val)
      list.back().should.equal(val)

      val = 21
      list.push(21)
      list.back().should.equal(val)

      list.pop()
      list.pop()
      should.not.exist(list.back())
    })
  })
  describe('Modifiers', function () {
    it('#assign()', function () {
      var arr = [1, 3, 5]
      list.assign([1, 3, 5])
      list.length.should.equal(3)

      arr.forEach(function (val) {
        list.front().should.equal(val)
        list.popFront()
      })
    })

    it('#pushFront()', function () {
      var val = 'test'
      list.pushFront(val)
      list.front().should.equal(val)
      list.back().should.equal(val)
      list.length.should.equal(1)

      var val2 = 'testerino'
      list.pushFront(val2)
      list.front().should.equal(val2)
      list.back().should.equal(val)
      list.length.should.equal(2)
    })

    it('#popFront()', function () {
      var val = 523
      var val2 = 29367
      list.push(val)
      list.push(val2)

      list.length.should.equal(2)
      list.popFront().should.equal(val)
      list.length.should.equal(1)
      list.front().should.equal(val2)
      list.back().should.equal(val2)
      list.popFront().should.equal(val2)
      list.length.should.equal(0)
      should.not.exist(list.front())
      should.not.exist(list.back())
      should.not.exist(list.popFront())
    })

    it('#push() #pushBack()', function () {
      var val = 2876
      list.push(val)
      list.length.should.equal(1)
      list.front().should.equal(val)
      list.back().should.equal(val)

      var val2 = 351
      list.push(val2)
      list.length.should.equal(2)
      list.front().should.equal(val)
      list.back().should.equal(val2)

      var val3 = 152
      list.push(val3)
      list.length.should.equal(3)
      list.front().should.equal(val)
      list.back().should.equal(val3)
    })

    it('#pop() #popBack()', function () {
      var arr = [2235, 347, 458]
      list.assign(arr)
      while (arr.length) {
        list.pop().should.equal(arr.pop())
        list.length.should.equal(arr.length)
        if (list.length) {
          list.front().should.equal(arr[0])
          list.back().should.equal(arr[arr.length - 1])
        } else {
          should.not.exist(list.front())
          should.not.exist(list.back())
        }
      }
    })

    xit('#insert()')

    it('#erase()', function () {
      var arr = [1, 2, 3, 4, 5, 6]
      var DELETE = 'delete'
      var SKIP = 'skip'
      var actions = [DELETE, SKIP, DELETE, SKIP, DELETE, DELETE]
      list.assign(arr)
      var it = list.Iterator()
      var arrIt = 0
      it.next() // now at `1`

      while (actions.length) {
        var action = actions.shift()
        if (action === DELETE) {
          list.erase(it).should.equal(arr.splice(arrIt, 1)[0])
          list.length.should.equal(arr.length)
          list.front().should.equal(arr[0])
          list.back().should.equal(arr[arr.length - 1])
        } else if (action === SKIP) {
          ++arrIt
          it.next()
        }
      }

      it.current().done.should.be.true
    })

    it('#swap()')

    it('#resize()')

    it('#clear()', function () {
      list.assign([1, 2, 3])
      list.clear()
      should.not.exist(list.front())
      should.not.exist(list.back())
      list.length.should.equal(0)
    })
  })

  describe('Operations', function () {
    it('#splice()')

    it('#remove()')

    it('#removeIf()')

    it('#unique()')

    it('#merge()')

    it('#sort()')

    it('#reverse()')

    it('#clone()', function () {
      list.assign([235, 'sdgsd', 23])
      var clone = list.clone()

      while (!list.isEmpty()) {
        (list.pop()).should.equal(clone.pop())
      }
    })
  })
})
