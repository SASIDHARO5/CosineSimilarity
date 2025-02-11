/*const express = require('express');
const router = express.Router();  // Define and initialize the router
const { spawn } = require('child_process');
const path = require('path');

// Define the route for processing the URL
router.post('/process-url', (req, res) => {
    const { url } = req.body;
    console.log('Received URL:', url);

    const pythonInterpreter = '/Users/sasi_/Documents/factguardpython/.venv/bin/python';
    const pythonScriptPath = '/Users/sasi_/Documents/factguardpython/cosinesimilaritywithreverselogic.py';

    // Spawning the process to execute the Python script using the virtual environment's Python interpreter
    const pyProcess = spawn(pythonInterpreter, [pythonScriptPath, url]);

    let output = '';
    let errorOutput = '';

    pyProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pyProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    pyProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            console.error(`Python script stderr: ${errorOutput}`);
            return res.status(500).send(`Error executing Python script: ${errorOutput}`);
        }

        console.log(`Python script stdout: ${output}`);

        const lines = output.trim().split('\n');
        console.log('Output lines:', lines);

        const finalPercentage = lines[lines.length - 1];
        console.log(`Final percentage: ${finalPercentage}`);

        if (finalPercentage) {
            res.send({ percentage: finalPercentage });
        } else {
            console.error('Final percentage not found.');
            res.status(500).send('No percentage found in the output.');
        }
    });
});

module.exports = router;  // Export the router
*/
const { exec } = require('child_process');
const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/process-url', (req, res) => {
    const url = req.body.url;
    exec(`source /Users/sasi_/Documents/factguardpython/.venv/bin/activate && python /Users/sasi_/Documents/factguardpython/cosinesimilaritywithreverselogic.py '${url}'`, { timeout: 1500000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return res.status(500).send(`Error executing Python script: ${error.message}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send(`Python script error: ${stderr}`);
      }
      console.log(stdout);
      res.send(stdout);
    });
});

module.exports = router;  // Export the router
