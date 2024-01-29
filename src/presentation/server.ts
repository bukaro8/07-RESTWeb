import express from 'express';
import { envs } from '../config/plugins/envs/envs.plugin';
import path from 'path';

interface Options {
	port: number;
	public_path?: string;
}

export class Server {
	private app = express();
	private port: number;
	private publicPath: string;
	constructor(options: Options) {
		const { port, public_path = 'public' } = options;
		this.port = port;
		this.publicPath = public_path;
	}
	async start() {
		//*Middlewares

		//?Public Folder
		this.app.use(express.static(this.publicPath));
		this.app.get('*', (req, res) => {
			const indexPath = path.join(
				__dirname + `../../../${this.publicPath}/index.html`
			);
			res.sendFile(indexPath);
		});

		this.app.listen(this.port, () => {
			console.log(`Server listening port ${this.port}`);
		});
	}
}

// export class Server {
// 	private app = express();
// 	async start() {
// 		this.app.listen(envs.PORT, () => {
// 			console.log(`Server listening port ${envs.PORT}`);
// 		});
// 	}
// }
// export const server = express();
// server.listen(envs.PORT, () => {
// 	console.log(`Server listening port ${envs.PORT}`);
// });
