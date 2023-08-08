import {ref, reactive, computed} from "vue";
import {notification} from "@/utils/elComponent.ts";

// 列表，分页，搜索，删除，修改状态

interface opt {
  searchForm?: any,
  getList?: Function,
  delete?: Function,
  updateStatus?: Function,
  onGetListSuccess?: Function,
  update?: Function
}

export function useInitTable(opt: opt = {
  delete() {
  }, getList() {
  }, searchForm: undefined, updateStatus() {
  }
}) {
  // 分页
  const pageNum = ref(1);
  const total = ref(0);
  const pageSize = ref(6);

  let searchForm: any = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
    if (opt.searchForm.pageNum === undefined && opt.searchForm.pageSize === undefined) {
      opt.searchForm.pageNum = pageNum.value
      opt.searchForm.pageSize = pageSize.value
    }
    searchForm = reactive({...opt.searchForm});
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key];
      }
      getData();
    };
  }

  const tableData = ref([]);
  const loading = ref(false);

  // 获取数据
  function getData(p = null) {
    if (typeof p == "number") {
      pageNum.value = p;
      searchForm.pageNum=p
    }
    loading.value = true;
    opt
      .getList(searchForm)
      .then((res: any) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
          opt.onGetListSuccess(res);
        } else {
          tableData.value = res.data.records || res.data;
          total.value = res.data.total;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  getData();

  // 删除
  const handleDelete = async (id: number) => {
    loading.value = true;
    const res = await opt.delete(id)
    if (res.status == 200) {
      notification("删除成功");
      getData();
    }
    loading.value = false;
  };

  // 修改状态
  const handleStatusChange = async (row: any,status: any ) => {
    row.statusLoading = true;
    const res = await opt
      .updateStatus(row.id, status)
    if (res.status == 200) {
      notification("修改状态成功");
      row.status = status;
    }
    row.statusLoading = false;
  };

  const handleUpdate = async (row: any) => {
    loading.value = true
    const res = await opt.update(row)
    if (res.status == 200) {
      notification("更新成功")
      getData()
    }
    loading.value = false
  }

  // 多选选中ID
  const multiSelectionIds = ref([]);
  const handleSelectionChange = (e: any) => {
    multiSelectionIds.value = e.map((o: any) => o.id);
  };
  // 批量删除
  const multipleTableRef = ref<any>(null);
  const handleMultiDelete = async () => {
    loading.value = true;
    const res = await opt
      .delete(multiSelectionIds.value)
    if (res.status == 200) {
      notification("删除成功");
      if (multipleTableRef.value) {
        multipleTableRef.value.clearSelection();
      }
      getData();
    }
    loading.value = false;
  };

  // 批量修改状态
  const handleMultiStatusChange = async (status: any) => {
    loading.value = true;
    const res = await opt
      .updateStatus(multiSelectionIds.value, status)
    if (res.status == 200) {
      notification("修改状态成功");
      // 清空选中
      multipleTableRef.value?.clearSelection();
      getData();
    }
    loading.value = false;
  };

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    pageNum,
    total,
    pageSize,
    getData,
    handleDelete,
    handleStatusChange,
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    multiSelectionIds,
    handleUpdate
  };
}
