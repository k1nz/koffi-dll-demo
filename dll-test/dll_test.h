#pragma once
#include <iostream>

#ifdef EXPORTING_TEST_MODULE
#define TEST_API __declspec(dllexport)
#else
#define TEST_API __declspec(dllimport)
#endif


struct TEST_API DivideResult {
    int value;
    bool hasError;
    char errorMessage[256];
};

extern "C" {
    TEST_API int Add(int a, int b);
    TEST_API int Sub(int a, int b);
    // C 风格的类包装函数

    class TEST_API DllClass {
    public:
        int Times(int a, int b);
        int Divide(int a, int b);
    };

    TEST_API void* CreateDllClass();
    TEST_API void DestroyDllClass(void* instance);

    TEST_API int Times(void* instance, int a, int b);
    TEST_API DivideResult Divide(void* instance, int a, int b);
}