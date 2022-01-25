import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Tp from "./tp.png";
import { useForm } from "react-hook-form";
import { uploadImg, save, update, saveItem, getMineItem, postDetail, detailItem } from "../../service/bbq";
import { apiConfig } from "../../service/mmp";
import TypeListComponent from "../component/TypeListComponent";
import Snackbar from "@mui/material/Snackbar";
import _ from "lodash";
import { getQueryStringRegExp } from "../../utils/index";
import { useHistory } from "react-router-dom";

const Container = styled.div`
    margin: 100px 210px 20px 210px;
`;
const CreateDiv = styled.div`
    margin: 30px 0 40px;
`;
const Xh = styled.span`
    color: red;
`;
const Hs = styled.span`
    color: #8a939b;
`;
const TpImg = styled.img`
    width: 160px;
`;
const Input = styled("input")({
    display: "none",
});

function Collections() {
    const [type, setType] = React.useState("");
    const [colData, setColData] = React.useState({});
    const [itemData, setItemData] = React.useState({});

    const [img, setImg] = React.useState("");
    const history = useHistory();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm();

    React.useEffect(() => {
        if (getQueryStringRegExp("type") == "col" && getQueryStringRegExp("colId")) {
            const params = {
                data: {
                    id: getQueryStringRegExp("colId"),
                },
            };
            postDetail(params).then((res) => {
                const d = _.get(res, "data", {});
                setColData(_.get(res, "data", {}));
                const { colImage, colName, memo, externalLink, colType } = d;
                setValue("colName", colName);
                setValue("externalLink", externalLink);
                setValue("memo", memo);
                setValue("colImage", colImage);
                setType(colType);
            });
        }
        if (getQueryStringRegExp("type") == "item" && getQueryStringRegExp("itemId")) {
            const params = {
                data: {
                    id: getQueryStringRegExp("itemId"),
                },
            };
            detailItem(params).then((res) => {
                // TODO
                // setItemData(_.get(res,'data',{}))x
            });
        }
    }, []);

    const onSubmit = (data) => {
        if (!type) {
            window._M.error("请选择类型");
        } else {
            const p = {
                data: {
                    ...data,
                    colType: type,
                    colImage: img,
                    id: getQueryStringRegExp("colId"),
                },
            };
            if (getQueryStringRegExp("type") == "col" && getQueryStringRegExp("colId")) {
                update(p).then((res) => {
                    if (res.code == "0000") {
                        window._M.success("更新成功");
                        history.push("/collections");
                    } else {
                        window._M.error(res.msg);
                    }
                });
            }
            if (getQueryStringRegExp("type") == "col" && !getQueryStringRegExp("colId")) {
                const params = {
                    data: {
                        ...data,
                        colType: type,
                        colImage: img,
                    },
                };
                save(params).then((res) => {
                    window._M.success("新建成功");
                    history.push("/collections");
                });
            }

            if (getQueryStringRegExp("type") == "item" ) {
                const { colName, externalLink, memo } = data;
                const p = {
                    data: {
                        itemImage: img,
                        itemName: colName,
                        externalLink: externalLink,
                        colType: type,
                        memo: memo,
                        collectId : getQueryStringRegExp("colId")?getQueryStringRegExp("colId"):''
                    },
                };
          
                saveItem(p).then((res) => {
                    window._M.success("保存成功");
                    history.push("/collections");
                });
            }
        }
    };
    // 创建按钮
    const createCollections = () => {
        handleSubmit(onSubmit);
    };
    const cb = (data) => {
        setType(data);
    };

    const nC = (e) => {
        const input = e.target;
        const files = e.target.files;
        const formData = new FormData();
        const file = files[0];
        if (files && files[0]) {
            if (file.size > 1024 * 1024 * 3) {
                return false;
            } else {
                formData.append("file", file);
            }
        }
        const params = {
            data: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencode",
            },
        };

        uploadImg(params).then((res) => {
            console.log(res, 22);
            setImg(_.get(res, ["data"]));
        });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom component="div">
                    创建一个集合
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Xh>*</Xh>
                    <Hs>必填字段</Hs>
                </Typography>

                <Typography variant="h6" gutterBottom component="div">
                    形象标识<Xh>*</Xh>
                </Typography>
                <Typography component="div">
                    <Hs>
                        此图像也将用于导航。推荐 350x350<Xh>*</Xh>
                    </Hs>
                </Typography>
                <Typography component="div" sx={{ mt: 5 }}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={nC} />

                        <TpImg src={img ? apiConfig.productionUrl + img + "" : Tp} />
                    </label>
                </Typography>

                <h4>
                    名称 <Xh>*</Xh>
                </h4>
                <TextField fullWidth id="outlined-basic" placeholder="集合名称" variant="outlined" {...register("colName", { required: true })} />
                {/* <input {...register("exampleRequired", { required: true })} /> */}
                <h4>描述</h4>
                <TextField fullWidth id="outlined-multiline-flexible" placeholder="提供您的详细描述" multiline maxRows={4} {...register("memo", { required: true })} />

                <h4>外部链接</h4>
                <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    placeholder="http://yoursite.io/item"
                    multiline
                    maxRows={4}
                    {...register("externalLink", { required: true })}
                />

                <h4>类型</h4>
                <TypeListComponent cb={cb}></TypeListComponent>

                <CreateDiv>
                    <Button variant="contained" type="submit" onPress={createCollections}>
                        创建
                    </Button>
                </CreateDiv>
            </form>
        </Container>
    );
}

export default Collections;
