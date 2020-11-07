import { message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { RcFile } from 'antd/lib/upload';
import { onPreview } from '@/utils';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// 上传文件
// rules={[{ required: true, message: '请上传图片' }, ruleImgLimit(0, 1)]}
// valuePropName='filelist'
// getValueFromEvent={normFile}

// type FileChange = {
//   file: RcFile;
//   fileList: RcFile[];
// };
type BeforeUpload = (
  file: RcFile,
  FileList: RcFile[],
) => boolean | PromiseLike<void>;
type Props = {
  url: string;
  onBeforeUpload?: (
    file: RcFile,
    FileList: RcFile[],
  ) => boolean | PromiseLike<void>;
  placeholder?: string;
  max?: number;
  maxSize?: number;
  maxSizeTip?: any;
  fileList?: SimpleObject[] | string[] | UploadFile<any>[];
  onChange?: (e: any) => any;
  style?: React.CSSProperties;
  className?: string;
};

const toImgUrl = (img: string[]): SimpleObject[] => {
  return img.map((i, index) => {
    return {
      uid: -1 - index,
      name: `test-${index}.png`,
      status: 'done',
      thumbUrl: i,
      response: i,
    };
  });
};
/**
 * 表单图片上传：
 *  onBeforeUpload和maxSize不兼容，两则并存，默认验证第一个
 */
const FormUpload: React.FC<Props> = ({
  url,
  onBeforeUpload,
  max = 1,
  maxSize = 10,
  maxSizeTip,
  fileList = [],
  placeholder,
  style,
  onChange,
  className,
  children,
}) => {
  const cName = className ?? 'name';
  const [photoNum, setPhotoNum] = useState<number>(fileList.length);
  // 可能是单个文件对时候，直接设置文件列表
  if (Array.isArray(fileList)) {
    if (fileList.length > 0 && typeof fileList[0] === 'string') {
      fileList = toImgUrl(fileList as string[]);
    }
  } else {
    fileList = toImgUrl([fileList as string]);
  }
  const defaultFileList: UploadFile<any>[] = fileList as UploadFile<any>[];

  const photoChange = ({
    file,
    fileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    // 图片上传的状态就不改变表单的内容了
    // 否则会form表单change两次
    // 多个文件上传的情况，之后考虑兼容
    if (file.status === 'uploading') return;
    if (file.status === 'done') {
      // console.log('图片数量', fileList.length);
      onChange && onChange({ file, fileList });
    }
    setPhotoNum(fileList.length ?? 0);
  };
  const beforeUploadLocal: BeforeUpload = (file, FileList) => {
    if (onBeforeUpload) {
      return onBeforeUpload(file, FileList);
    }
    const defaultMaxSizeTip = (maxSize: number) => `最大图片大小为${maxSize}mb`;
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      const _ = maxSizeTip || defaultMaxSizeTip;
      message.error(_(maxSize));
      return Promise.reject(_(maxSize));
    }
    // 条件没有错误的情况
    return true;
  };
  return (
    <div className={cName} style={style}>
      <div>
        <Upload
          accept='image/*'
          beforeUpload={
            onBeforeUpload || maxSize ? beforeUploadLocal : undefined
          }
          listType='picture-card'
          action={`${url}`}
          onChange={photoChange}
          defaultFileList={[...defaultFileList]}
          onPreview={onPreview}
        >
          {photoNum < max && (
            <>
              <UploadOutlined /> <span>上传图片</span>
            </>
          )}
        </Upload>
        <div>{placeholder}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export { FormUpload, toImgUrl };
