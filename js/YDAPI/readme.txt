���ܣ������ʵ��ҵ������ݻ�ȡ�������Լ��ص��ȹ���
����ӿ�˵����
var instance=new YX.Data() 
@abstract ��ʼ�����ݽӿڣ����ýӿڱ���ִ�У�����index.html lid����tid���û�ȡ��վȺ����

instance.Site(callback)
@abstract ��ȡ��վ����վ�������Ϣ�ӿ�
@callback ��ȡ���ݺ�ִ�еĻص�������������ͼ������Ϊ�ص������Ĳ�������

instance.Map(sid,callback) 
@abstract ��ȡ��վ��ͼ���ݽӿ�
@callback ��ȡ���ݺ�ִ�еĻص�������������ͼ������Ϊ�ص������Ĳ�������
@sid ��վ��ţ�Ϊ�������index.html�����ж�ȡ,����ȡ���������쳣

instance.Hot(sid,callback)
@abstract ��ȡϵͳ���º�վ��������10�����Žӿ�
@callback ��ȡ���ݺ�Ļص�������������ͼ������Ϊ�ص������Ĳ�������
@sid ��վ��ţ�ȱʡΪ�ϴ�Map�ӿڴ��ݵĲ���


instance.List(mid,callback,pno,pco,sid)
@abstract ��ȡָ����Ŀ���б����ݽӿ�
@callback ��ȡ���ݺ�Ļص�������������ͼ������Ϊ�ص������Ĳ�������
@mid ��Ŀ���
@pno �ڼ�ҳ�±��1��ʼ��Ĭ��Ϊ��һҳ
@pco ÿҳ��������Ĭ��Ϊ150��
@sid ��վ��ţ�ȱʡΪ�ϴ�Map�ӿڴ��ݵĲ���

instance.Art(aid,callback)
@abstract ��ȡ�������ݽӿ�
@aid ���±��
@callback ��ȡ���ݺ�ִ�еĻص���������������������Ϊ�ص������Ĳ�������


instance.office.Cate(lid,tid,callback)
@abstract ��ȡ����ϵͳ��Ŀ�ӿ�
@callback ��ȡ���ݺ�Ļص�������������ͼ������Ϊ�ص������Ĳ�������
@lid ϵͳ����������ȱʡΪ����ҳ����idΪyx_lidԪ��text��ֵ
@tid ϵͳ������ҵ��ȱʡΪ����ҳ����idΪyx_tidԪ��text��ֵ


instance.office.List(cid,callback)
@abstract ��ȡָ����Ŀ�µİ������ݽӿ�
@callback ��ȡ���ݺ�Ļص�������������ͼ������Ϊ�ص������Ĳ�������
@cid ��Ŀ���

instance.office.Art(aid,callback)
@abstract ��ȡ�����������ݽӿ�
@callback ��ȡ���ݺ�ִ�еĻص���������������������Ϊ�ص������Ĳ�������
@aid ���±��





instance.cache.IsCache=[true|false]
@abstract ָʾ��ȡ�������Ƿ񻺴�

instance.SetTimeout(t)
@abstract �����������ݳ�ʱʱ��
@t ��ʱʱ��(����)��Ĭ����ֵΪ10000

YX.Data.StopAllRequest()
@abstract �ж���������

instance.cache.Clear()
@abstract ������ݻ���

instance.RD(url,data,callback,cKey)
@url ���ݽӿڵĵ�ַ
@data �����ݽӿ��ύ������
@abstract ��ȡͨ�����ݽӿ�
@callback ��ȡ���ݺ�Ļص�������������ͼ������Ϊ�ص������Ĳ�������
@cKey ���û����ֵ
