module.exports = function(app)
{
	app.get('*', (req, res) => {
		res.status(404).send('404 Page not found');
	});
}