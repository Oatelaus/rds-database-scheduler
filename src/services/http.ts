import { request } from 'https';

export function post(url: string | undefined, data: any) {
  return new Promise((resolve, reject) => {
    if (!url) {
      return reject();
    }

    const uri = new URL(url);

    const req = request({
      method: 'POST',
      host: uri.host,
      path: uri.pathname,
      headers: {
        'Content-Type': 'application/json',
      },
    }, ((res) => {
      let buffers: any[] = [];
      res.on('error', reject);
      res.on('data', (buffer) => buffers.push(buffer));
      res.on(
        'end',
        () =>
          res.statusCode === 200
            ? resolve(Buffer.concat(buffers).toString())
            : reject(Buffer.concat(buffers).toString()),
      );
    }));

    req.write(JSON.stringify(data));
    req.end();
  });
}