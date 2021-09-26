## Error snapshots

When snapshotting server responses:

```
expect(res).toMatchSnapshot();
```

Error objects are output as:

```
[GraphQLError: lorem ipsum dolor sit amet]
```

This restricts checking of additional error meta data such as `location`, `path`, `extensions `etc.

Prefer to additionally stringify and snapshot individual errors to capture this data:

```
expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
```
