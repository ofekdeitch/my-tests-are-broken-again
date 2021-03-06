# My Tests Are Broken Again

This project provides real-world code examples for the blog post [My Tests Are Broken Again](https://medium.com/fiverr-engineering/my-tests-are-broken-again-part-1-understanding-the-problem-c8b88a77578d).
<br/>
<br/>

### Where should I start?

You should start by reading [the tests](https://github.com/ofekdeitch/expressive-tests/tree/master/src/tests/integration).

Then, you should see how the [Test Driver](https://github.com/ofekdeitch/expressive-tests/blob/master/src/tests/common/driver/index.ts) works under the hood. 
<br/>
<br/>

### Make sure that you notice

We have two categories of data-types in the project:
1. [Models](https://github.com/ofekdeitch/expressive-tests/tree/27e0e623bae0a34fa22eff0a8563ea28a5037de1/src/models) - the internal representation of the state. The components and store are using these data-types.
2. [Contracts](https://github.com/ofekdeitch/expressive-tests/tree/27e0e623bae0a34fa22eff0a8563ea28a5037de1/src/apis/dataview/contracts) - the representation of the persisted data, as we receive it from our back-end. Only the data-retrieval layer uses these types.

When data arrives from the back-end, we [convert the contracts into models](https://github.com/ofekdeitch/expressive-tests/blob/master/src/apis/dataview/index.ts#L10).

Notice that the Test Driver is coupled to the contract between the front-end and back-end: no model is imported into the Test Driver. Instead, we are only using Contracts ([dataview](https://github.com/ofekdeitch/expressive-tests/blob/master/src/tests/common/driver/index.ts#L5), [message](https://github.com/ofekdeitch/expressive-tests/blob/master/src/tests/common/driver/index.ts#L6)).

<br/>
<center>
<img src="https://user-images.githubusercontent.com/28839308/150111059-eb354a67-8e8f-4a70-a604-4fe235ea2727.jpg" />
</center>
