
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';

export default defineConfig({
	// ... otras configuraciones que ya tengas ...
	server: {
		fs: {
			allow: [
				// Busca la raíz del proyecto automáticamente (comportamiento por defecto)
				searchForWorkspaceRoot(process.cwd()),

				// Añade explícitamente la ruta externa que necesitas
				'/home/jose/devel/my_repos/sebiblia.github.io/data'
			]
		}
	}
});

