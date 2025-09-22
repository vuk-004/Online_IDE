const savebtn = document.getElementById("savebtn");
const loadbtn = document.getElementById("loadbtn");

axios.defaults.withCredentials = true;

// ------------------ Save Code ------------------
savebtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!document.cookie) {
    alert("Please login or register to save code");
    return;
  }

  const code = editor.getValue();
  console.log(code);
  const lang = document.getElementById("language").value;

  if (!code) {
    alert("Code is required");
    return;
  }

  const filename = prompt("Enter filename (with extension):", document.getElementById("filename").value);
  if (!filename || filename.trim() === "") return alert("Filename is required");
  console.log("here");

  try {
    const data = { code, lang, filename };
    const resp = await axios.post("http://localhost:7956/save", data, {
      headers: { "Content-Type": "application/json" }
    });

    if (resp.data.status === 200) {
      alert(resp.data.msg);
      document.getElementById("filename").value = filename;
    } else {
      alert(resp.data.msg || "Failed to save code");
    }
  } catch (err) {
    console.error(err);
    alert("Error saving code");
  }
});

// ------------------ Load Code ------------------
loadbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!document.cookie) {
    alert("Please login or register");
    return;
  }

  try {
    const listResp = await axios.get("http://localhost:7956/list-files", {
      headers: { "Content-Type": "application/json" }
    });

    if (listResp.data.status !== 200 || !listResp.data.files || listResp.data.files.length === 0) {
      return alert("No files found");
    }

    const files = listResp.data.files;
    let popup = "Select a file to load:\n";
    files.forEach((f, i) => popup += `${i + 1}: ${f}\n`);

    const choice = prompt(popup + "Enter the number of the file:");
    if (!choice) return;
    const index = parseInt(choice) - 1;
    if (index < 0 || index >= files.length) return alert("Invalid selection");

    const filename = files[index];

    const loadResp = await axios.post("http://localhost:7956/load", { filename }, {
      headers: { "Content-Type": "application/json" }
    });

    if (loadResp.data.status === 200) {
      editor.setValue(loadResp.data.code, -1); 
      document.getElementById("filename").value = filename;
    } else {
      alert(loadResp.data.msg || "Failed to load code");
    }
  } catch (err) {
    console.error(err);
    alert("Error loading files");
  }
});
