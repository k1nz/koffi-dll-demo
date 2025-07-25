#pragma once
#include <iostream>

extern "C" {
    __declspec(dllexport) int Add(int a, int b);
    __declspec(dllexport) int Sub(int a, int b);
    // C 风格的类包装函数
    __declspec(dllexport) void* CreateDllClass();
    __declspec(dllexport) void DestroyDllClass(void* instance);
    __declspec(dllexport) int Times(void* instance, int a, int b);

    struct DivideResult {
        int value;
        bool hasError;
        char errorMessage[256];
    };
    __declspec(dllexport) DivideResult Divide(void* instance, int a, int b);
}
class __declspec(dllexport) DllClass {
public:
	int Times(int a, int b);
    int Divide(int a, int b);
};
