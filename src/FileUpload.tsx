import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";


const Input = styled('input')({
  display: 'none',
});


const FileUpload = (params: {id: string, setUserNames: (arg0: string[]) => void; }) => {
  const [files, setFiles] = useState({} as {[key: string]: File});
  const [pageContent, setPageContent] = useState([] as string[]);
  const [names, setNames] = useState([] as string[]);
  const setPage = (pageIndex: number) => {
    setPageContent(names.slice((pageIndex-1) *10, pageIndex*10))
  }
  React.useEffect(() => {
    setPage(1)
    params.setUserNames(names)

  }, [names]); // eslint-disable-line react-hooks/exhaustive-deps


  React.useEffect(() => {
    const fetchData = async () => {
        await parseFiles();
    }
    fetchData()

  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  const addNewFiles = (newFiles: any) => {
    for (let file of newFiles) {
        files[file.name] = file;
    }
    return { ...files };
  };

  const readFileAsync = (file:File) =>  {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        var enc = new TextDecoder("utf-8");
        const res = enc.decode(reader.result as ArrayBuffer)
        resolve(res);
      };
  
      reader.onerror = reject;
  
      reader.readAsArrayBuffer(file);
    })
  }

  const parseFiles = async () => {
    let all_names: string[] = [] 
    for (const [, value] of Object.entries(files)) {
        const s = await readFileAsync(value);
        const parser = new DOMParser();
        const doc = parser.parseFromString(s, "text/html");
        const elements = [...doc.getElementsByTagName('a')].filter(el => el['target'] === '_blank').map(el => el.innerText)
        all_names = all_names.concat(elements)

      }
      setNames(all_names)

  }

  const handleNewFileUpload = async (e: { target: { files: any; }; }) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);

    };
  }
  return (
    // followers minus following
    <Box>
    <List>
        {Object.keys(files).map((key: string) => (
            <ListItem
                key={files[key].name}
                disableGutters
            >
                <ListItemText primary={`${files[key].name}`} />
            </ListItem>
        ))}
    </List>
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor={params.id}>
        <Input id={params.id} accept="*/*" multiple type="file" onChange={handleNewFileUpload}/>
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </Stack>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {pageContent.map((name) => (
        <ListItem disablePadding>
            <ListItemText primary={name} />
        </ListItem>
        ))}

      </List>
    </Box>


    <Pagination count={Math.ceil(names.length/10)} onChange={(e, value) => setPage(value)} />
    </Box>
  );
}
export default FileUpload;