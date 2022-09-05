Action

```
return new Response(null, {
  status: 302,
  headers: {
  Location: "/posts/admin"
  }
})
```

es igual a esto

```
redirect('/posts/admin')
```
