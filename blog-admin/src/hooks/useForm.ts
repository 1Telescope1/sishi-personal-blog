import {ref, reactive, computed} from "vue";
import {notification} from "@/utils/elComponent.ts";

interface opt {
    form: Object,
    rules: Object,
    beforeSubmit: Function,
    update: Function,
    create: Function,
    getData: Function,

}

// 新增，修改
export function useInitForm(opt: opt = {}) {
    // 表单部分
    const formDrawerRef = ref<any>(null);
    const formRef = ref<any>(null);
    const defaultForm: any = opt.form;
    const form = reactive({});
    const rules = opt.rules || {};
    const editId = ref(0);
    const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
    const handleSubmit = () => {
        formRef.value?.validate((valid: any) => {
            if (!valid) return;

            formDrawerRef.value?.showLoading();

            let body = {};
            if (opt.beforeSubmit && typeof opt.beforeSubmit == "function") {
                body = opt.beforeSubmit({...form});
            } else {
                body = form;
            }

            const fun = editId.value
                ? opt.update(editId.value, body)
                : opt.create(body);

            fun
                .then((res: any) => {
                    notification(drawerTitle.value + "成功");
                    // 修改刷新当前页，新增刷新第一页
                    opt.getData(editId.value ? false : 1);
                    formDrawerRef.value.close();
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        });
    };

    // 重置表单
    function resetForm(row = false) {
        if (formRef.value) formRef.value.clearValidate();
        for (const key in defaultForm) {
            form[key] = row[key];
        }
    }

    // 新增
    const handleCreate = () => {
        editId.value = 0;
        resetForm(defaultForm);
        formDrawerRef.value.open();
    };

    // 编辑
    const handleEdit = (row: any) => {
        editId.value = row.id;
        resetForm(row);
        formDrawerRef.value.open();
    };

    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit,
    };
}
