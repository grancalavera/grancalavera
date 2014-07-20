---
layout: post
title: Swift Double Dispatch Pattern
published: true
date: 2014-07-20
tags: ios swift games
comments: true
---

I've been playing around with Swift since the day after it was announced and I must say I like it very much. So much my current pet project is a game built with Swift and SpriteKit.

My game uses the physics engine shipped with SpriteKit out of the box, and most of what is does is making decisions based on information derived from `SKPhyisicsContact` instances. Up until this weekend, most of what I've done just involved managing a collision between two instances of the same class, so I've been able to make progress just following the documentation.

But now I've reached a point when I'm starting to understand what I'm actually doing, and new collisions between different classes are now visible in the horizon. If you read through the [Simulating Physics](https://developer.apple.com/library/ios/documentation/GraphicsAnimation/Conceptual/SpriteKit_PG/Physics/Physics.html) on the SpriteKit Programming Guide, and pass the naive `didBeginContact` implementation, you'll read:

<blockquote>
Consider studying the Double Dispatch Pattern and using it to farm out the work to other objects in the system. Embedding all of the logic in the scene can result in long, complicated contact delegate methods that are difficult to read.
</blockquote>

The documentation links to the [Double Dispatch pattern](http://en.wikipedia.org/wiki/Double_dispatch) article in Wikipedia, where you can find a link to the [Visitor pattern](http://en.wikipedia.org/wiki/Visitor_pattern) article, which is what you ultimately need to use given that [Swift doesn't have dynamic dispatch](http://stackoverflow.com/questions/24014045/does-swift-have-dynamic-dispatch-and-virtual-methods). If you look around, you'll find an example of [double dispatch using Objective-C](http://stackoverflow.com/questions/19882396/double-dispatch-for-collision-handling-with-spritekit), which is very similar to what I was looking for but not exactly the same.

Following is my own implementation of simulated double dispatch using the visitor pattern, which is based almost exclusively on the visitor pattern article from Wikipedia.

Instead of using the article's naming convention, I'm naming my objects in a way that the actually make sense in the context of my application:

- `Visitor` is named `ContactHandler`
- `Element` is named  `GameObject`
- `Visitor.visit` is named  `ContactHandler.contactWith`
- `Element.accept` is named  `GameObject.handleContact`

<figure>
<figcaption>Simulated double dispatch pattern implemented in Swift</figcaption>
{% highlight  Java %}
import Foundation
import SpriteKit

class ContactHandler {
    let object:GameObject!
    init (object withObjec:GameObject) {
        object = withObjec
    }
    func contactWith(object withObject: Bar) {
        println("A Bar made contact with a \(object.className)")
    }
    func contactWith(object withObjec: Foo) {
        println("A Foo made contact with a \(object.className)")
    }
}

class GameObject: SKNode {
    var contactHandler:ContactHandler!
    init()  {
        super.init()
        contactHandler = ContactHandler(object: self)
    }
    func handleContact(handler withHandler: ContactHandler) {}
}

class Foo: GameObject {
    override func handleContact(handler withHandler: ContactHandler) {
        withHandler.contactWith(object: self)
    }
}

class Bar: GameObject {
    override func handleContact(handler withHandler: ContactHandler) {
        withHandler.contactWith(object: self)
    }
}

let foo = Foo()
let bar = Bar()

foo.handleContact(handler: foo.contactHandler)
foo.handleContact(handler: bar.contactHandler)
bar.handleContact(handler: bar.contactHandler)
bar.handleContact(handler: foo.contactHandler)
{% endhighlight %}
</figure>

If you run this code from a Playground you should get the following output:

```
A Foo made contact with a _TtC11lldb_expr_03Foo
A Foo made contact with a _TtC11lldb_expr_03Bar
A Bar made contact with a _TtC11lldb_expr_03Bar
A Bar made contact with a _TtC11lldb_expr_03Foo
```

I'm creating a `ContactHandler` instance in each one of my `GameObject` instances at construction time. In the future, I'll be creating `ContactHandler` specializations, most likely by conformance to a protocol rather than by inheritance. I hope that by doing so I'll be able to decouple contact handling while at the same time encapsulate the details in each `GameObject`.

Something to notice is that your `ContactHandler` must not inherit from any existing Objective-C object. For instance:

{% highlight  Java %}
class ContactHandler: NSObject {
  ...
}
{% endhighlight %}


Will produce the following output:

```
A Bar made contact with a _TtC11lldb_expr_03Foo
A Bar made contact with a _TtC11lldb_expr_03Bar
A Bar made contact with a _TtC11lldb_expr_03Bar
A Bar made contact with a _TtC11lldb_expr_03Foo
```

What seems to be happening there is that `ContactHandler` ends up ignoring the dynamic type of the `GameObject` and always resolves with the first implementation it finds for `contactWith`. Do you know why this happens? I'd really appreciate any hints around this one.
