const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();

const uploadDirectory = 'uploads';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });
/*
router.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);

  const venvPath = '/Users/sasi_/Documents/factguardpython/.venv';
  const pythonScriptPath = '/Users/sasi_/Documents/factguardpython/contentcreator.py';
  const filePath = path.resolve(uploadDirectory, req.file.filename);

  const activateCommand = `source ${path.join(venvPath, 'bin/activate')}`;
  const executeCommand = `python ${pythonScriptPath} '${filePath}'`;

  const command = `${activateCommand} && ${executeCommand}`;

  console.log(`Executing command: ${command}`);
  exec(command, { timeout: 1200000 },  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).send('Error executing Python script');
    }
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      return res.status(500).send(`Python script stderr: ${stderr}`);
    }
    //console.log(stdout);
    console.log(`Python script stdout: ${stdout}`);

        const lines = stdout
        console.log('Output lines:', lines);
        if (lines) {
          res.send({ percentage: lines});
      } else {
          console.error('Final percentage not found.');
          res.status(500).send('No percentage found in the output.');
      }

    //const lines = stdout.trim().split('\n');
    //console.log('Output lines:', lines);

    //Extract the line that contains the percentage
    //const percentageLine = lines.find(line => line.startsWith('Output from bertpiperecieve.py:'));
    //if (percentageLine) {
      //const finalPercentage = percentageLine.split(': ')[1].trim();
      //console.log(`Final percentage: ${finalPercentage}`);
      //res.send({ percentage: finalPercentage });
    //} else {
      //console.error('Final percentage not found.');
      //res.status(500).send('No percentage found in the output.');
    //}
  });
});
*/

router.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded:', req.file);

  const filePath = path.resolve(uploadDirectory, req.file.filename);
  exec(`source /Users/sasi_/Documents/factguardpython/.venv/bin/activate && python /Users/sasi_/Documents/factguardpython/contentcreator.py '${filePath}'`, { timeout: 1500000 }, (error, stdout, stderr) => {
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
module.exports = router;
