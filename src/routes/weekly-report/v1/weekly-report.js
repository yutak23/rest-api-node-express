import { Router } from 'express';

const router = Router();

router.post('/answer', (req, res) => {
	try {
		console.log(req.token);

		res.status(201).json({ message: 'success' });
	} catch (e) {
		res.status(e.status || 500).error({ error: e.message });
	}
});

export default router;
