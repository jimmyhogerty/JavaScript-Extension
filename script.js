async function main() {
  console.log("Project Initialized");
  await replit.init();

  // Once initialized, show the #buttons container and hide the loading screen
  document.getElementById("buttons").style.display = "flex";
  document.getElementById("loading").style.display = "none";
  
  // Detect if yaml file is in root of folder. If not, prompt user to put one in.

  // Detect if .env file is in root of folder. If not, prompt user to put one in.
  // -- Perhaps include guide on how user can get secret token

  // If both detected, and if form is complete, go ahead and launch page.
  document
    .getElementById("create_test_dir")
    .addEventListener("click", async () => {
      
      async function checkFileExists(filename) {
        const result = await replit.fs.readFile(filename).catch(() => {
          console.log("Cannot find file");
        });
        
        if (result.error === 'NOT_FOUND') {
          console.log(result.error);
          return;
        }
        
        console.log('Found it', result.content)
      }

      checkFileExists("test.html");
    
      
      // await replit.fs.createDir('test');
      // // Show a confirmation
      // await replit.messages.showConfirm("Folder Created")
    });

  // Create afile named 'test-file.txt' at root level containing 'example content' when #touch_test_file is clicked
  document
    .getElementById("touch_text_file")
    .addEventListener("click", async () => {
      await replit.fs.writeFile("test-file.txt", "example content");

      // Show a confirmation
      await replit.messages.showConfirm("File Created");
    });

  // Read all the files & folders in the Repl's file system at root level when #ls_a is clicked
  document.getElementById("ls_a").addEventListener("click", async () => {
    const { children } = await replit.fs.readDir(".");

    // Show the files and folders in #file_folder_list
    document.getElementById("file_folder_list").innerHTML = "";
    for (const child of children) {
      const li = document.createElement("li");
      li.innerText = child.filename;
      document.getElementById("file_folder_list").appendChild(li);
    }
  });
}

window.addEventListener("load", main);
