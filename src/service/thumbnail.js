const path = `public/image/${Date.now()}.jpg`;
await request(req.body.link).pipe(fs.createWriteStream(path));
const image = await jimp.read(path);
await image.resize(50, 50);
await image.writeAsync(path);
