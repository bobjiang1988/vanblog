import ProCard from '@ant-design/pro-card';
import { Card, Space, Button, Upload, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

export default function (props) {
  const { initialState, setInitialState } = useModel('@@initialState');
  const handleOutPut = () => {
    const { fetchInitData, ...toExport } = initialState;
    const data = JSON.stringify(toExport, undefined, 4);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `备份-${moment().format('YYYY-MM-DD')}.json`;
    link.click();
  };
  return (
    <ProCard>
      <Space size="large">
        <Upload
          showUploadList={false}
          name="file"
          accept=".json"
          action="/api/admin/all/import"
          headers={{
            token: (() => {
              return window.localStorage.getItem('token') || 'null';
            })(),
          }}
          onChange={(info) => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} 上传成功! 稍后刷新就生效了!`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 上传失败!`);
            }
          }}
        >
          <Button>导入</Button>
        </Upload>
        <Button type="primary" onClick={handleOutPut}>
          导出
        </Button>
      </Space>
    </ProCard>
  );
}