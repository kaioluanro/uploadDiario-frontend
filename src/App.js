import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "./services/api";
import io from "socket.io-client";

import GlobalStyle from "./styles/global";
import { Content, Container, BgAnimated } from "./styles";
import Upload from "./components/Upoload";
import FileList from "./components/FileList";

class App extends Component {
  state = {
    uploadedFiles: [],
    socket: io("http://localhost:3335"),
  };

  async componentDidMount() {
    const response = await api.get("posts");

    const socket = io("http://localhost:3335");
    socket.on("connect", () => {
      socket.on("news", (cmd) => {
        console.log(cmd);
        if (cmd.msg === true) {
          document.location.reload(true);
        } else {
          console.error("Error: comando nao recebido!!");
        }
      });
    });

    this.setState({
      uploadedFiles: response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        uploaded: true,
        url: file.url,
      })),
    });
  }

  handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles).reverse(),
    });
    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFiles) => {
        return id === uploadedFiles.id
          ? { ...uploadedFiles, ...data }
          : uploadedFiles;
      }),
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("/posts", data, {
        onUploadProgress: (e) => {
          document.getElementById("bgAnimated").style.animationPlayState =
            "running";
          document.getElementById("bgAnimated").innerText = "upload";
          document.getElementById("bgAnimated").style.fontSize = "30em";
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
        document.getElementById("bgAnimated").innerText = "sucesso";
        document.getElementById("bgAnimated").style.fontSize = "30em";
        document.getElementById("bgAnimated").style.color = "#72F296";

        this.state.socket.send(true);

        setTimeout(() => {
          document.getElementById("bgAnimated").style.fontSize = "47em";
          document.getElementById("bgAnimated").innerText = "diário";
          document.getElementById("bgAnimated").style.color = "#EBEBEB";
          document.getElementById("bgAnimated").style.animationPlayState =
            "paused";
          document.getElementById("bgAnimated").style.opacity = 1;
        }, 3000);
      })
      .catch(() => {
        document.getElementById("bgAnimated").innerText = "erro";

        document.getElementById("bgAnimated").style.color = "#E65847";
        document.getElementById("bgAnimated").style.animationPlayState =
          "paused";
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    document.getElementById("bgAnimated").style.animationPlayState = "running";
    document.getElementById("bgAnimated").style.color = "#e65847";
    document.getElementById("bgAnimated").innerText = "excluindo";
    document.getElementById("bgAnimated").style.fontSize = "28em";

    await api.delete(`posts/${id}`).then(() => {
      setTimeout(() => {
        this.state.socket.send(true);

        document.getElementById("bgAnimated").style.fontSize = "30em";
        document.getElementById("bgAnimated").innerText = "sucesso";
        document.getElementById("bgAnimated").style.color = "#72F296";
        setTimeout(() => {
          document.getElementById("bgAnimated").style.fontSize = "47em";
          document.getElementById("bgAnimated").innerText = "diário";
          document.getElementById("bgAnimated").style.color = "#EBEBEB";
          document.getElementById("bgAnimated").style.animationPlayState =
            "paused";
          document.getElementById("bgAnimated").style.opacity = 1;
        }, 2000);
      }, 1000);
    });

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
    });
  };

  render() {
    const { uploadedFiles } = this.state;
    return (
      <Container>
        <BgAnimated id="bgAnimated">diário</BgAnimated>
        <Content id="content">
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList
              files={uploadedFiles}
              onDelete={this.handleDelete}
              attListFiles={this.attListFiles}
            />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
