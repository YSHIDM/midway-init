const f = ({ a, b, ...data }) => {
  console.log('data :>>', data);
  console.log({
    a,
    ...data,
  });
};
f({
  a: 1,
  b: 2,
  c: 3,
  d: 4,
});
