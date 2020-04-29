import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "./services/api";

import GlobalStyle from "./styles/global";
import { Content, Container } from "./styles";
import Upload from "./components/Upoload";
import FileList from "./components/FileList";

class App extends Component {
  state = {
    uploadedFiles: [],
  };

  updateListFile = () => {};

  async componentDidMount() {
    const response = await api.get("posts");

    this.setState({
      uploadedFiles: response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        uploaded: true,
        url: file.url,
      })),
    });
    setInterval(async () => {
      const response = await api.get("posts");

      this.setState({
        uploadedFiles: response.data.map((file) => ({
          id: file._id,
          name: file.name,
          readableSize: filesize(file.size),
          uploaded: true,
          url: file.url,
        })),
      });
    }, 5000);
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
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
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
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
    });
  };

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
