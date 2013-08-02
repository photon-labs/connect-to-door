//
//  ctdWelcomeViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdWelcomeViewController.h"
#import "ctdProfileViewController.h"
#import "ctdVoucherViewController.h"
#import "ctdDailyAttendaceViewController.h"
#import "ctdAttendanceListViewController.h"
#import "ctdAttendanceFormViewController.h"
#import "ctdLoginViewController.h"
#import "ctdLocalStorage.h"
#import "ctdLocalStorage.h"
#import "ctdResponseCheckInModel.h"
#import "ctdCheckInParser.h"
#import "ctdAppDelegate.h"
#import "ctdCheckStatusService.h"
#import "ctdCheckOutParser.h"
#import "ctdCheckStatusParser.h"
#import "ctdResponseCheckStatusModel.h"
#import "ctdResponseCheckOutModel.h"
#import "ctdConstants.h"

@implementation ctdWelcomeViewController

@synthesize welcome;
@synthesize statusCheck;
@synthesize checkInButton;
@synthesize checkOutButton;
@synthesize profileButton;
@synthesize voucherButton;
@synthesize dailyAttendanceButton;
@synthesize attendanceListButton;
@synthesize signOutButton;
@synthesize attendanceFormButton;
@synthesize attendanceReportButton;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        self.hasBackButton = NO;
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated{
    checkStatusService = [[ctdCheckStatusService alloc]init];
    checkStatusService.delegate = self;
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    NSString *employeeId = [localStorage getEmployeeId];
    [checkStatusService checkStatusToServer:employeeId];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    welcome.text = [NSString stringWithFormat:@"Welcome, %@",[self getNameUser]];
    self.title = @"Welcome";
   
    [self setShowButton];
    
    
}

- (void)setShowButton{
    NSString *previllage = [[NSUserDefaults standardUserDefaults] objectForKey:@"previllage"];
    NSLog(@"previllage ===== %@", previllage);
    
    isAdmin = [previllage isEqualToString:@"Admin"] ? YES: NO;
    if(isAdmin){
        attendanceFormButton.alpha = 1.0;
        attendanceReportButton.alpha = 1.0;
    }else{
        attendanceFormButton.alpha = 0.0;
        attendanceReportButton.alpha = 0.0;
    }
}

-(NSString*)getNameUser{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc] init];
    return [localStorage getNameUserFacebook];
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)didCheckInClicked:(id)sender{
    checkInService = [[ctdCheckInService alloc]init];
    checkInService.delegate = self;
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    NSString *employeeId = [localStorage getEmployeeId];
    [checkInService checkInToServer:employeeId];
}

- (IBAction)didCheckOutClicked:(id)sender{
    checkOutService = [[ctdCheckOutService alloc]init];
    checkOutService.delegate = self;
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    NSString *employeeId = [localStorage getEmployeeId];
    [checkOutService checkOutToServer:employeeId];
}

- (IBAction)didProfileClicked:(id)sender{
    [self goToProfile];
}

- (IBAction)didVoucherClicked:(id)sender{
    [self goToVoucher];
}

- (IBAction)didDailyAttendanceClicked:(id)sender{
    [self goToDailyAttendance];
}

- (IBAction)didAttendanceListClicked:(id)sender{
    [self goToAttendanceList];
}

- (IBAction)didSignOutClicked:(id)sender{
    ctdLoginViewController *loginViewController = [[ctdLoginViewController alloc]initWithNibName:@"ctdLoginViewController" bundle:nil];
    
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    [self.navigationController pushViewController:loginViewController animated:YES];
    [appDelegate.session closeAndClearTokenInformation];
}

-(void) goToProfile{
    ctdProfileViewController *profileViewController = [[ctdProfileViewController alloc]initWithNibName:@"ctdProfileViewController" bundle:nil];
    profileViewController.hasSignoutButton = YES;
    [self.navigationController pushViewController:profileViewController animated:YES];
}

-(void) goToVoucher{
    ctdVoucherViewController *voucherViewController = [[ctdVoucherViewController alloc]initWithNibName:@"ctdVoucherViewController" bundle:nil];
    [self.navigationController pushViewController:voucherViewController animated:YES];
}

-(void) goToDailyAttendance{
    ctdDailyAttendaceViewController *dailyAttendanceViewController = [[ctdDailyAttendaceViewController alloc]initWithNibName:@"ctdDailyAttendaceViewController" bundle:nil];
    [self.navigationController pushViewController:dailyAttendanceViewController animated:YES];
}

-(void) goToAttendanceList{
    ctdAttendanceListViewController *attendanceListViewController = [[ctdAttendanceListViewController alloc]initWithNibName:@"ctdAttendanceListViewController" bundle:nil];
    [self.navigationController pushViewController:attendanceListViewController animated:YES];
}

-(NSString*) getCurrentDate {
    NSDate *today = [NSDate date];
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    // display in 12HR/24HR (i.e. 11:25PM or 23:25) format according to User Settings
    [dateFormatter setTimeStyle:NSDateFormatterShortStyle];
    NSString *currentTime = [dateFormatter stringFromDate:today];
    NSLog(@"User's current time in their preference format:%@",currentTime);
    return currentTime;
}


-(BOOL)checkValidationCheckIn:(NSString*)message{
    if([message isEqualToString:@"success"]){
        return TRUE;
    }
    return FALSE;
}


#pragma CheckIn Service Delegate
- (void)didReceivedCheckInResponse:(NSString*)response{
    ctdCheckInParser *parse = [[ctdCheckInParser alloc]init];
    ctdResponseCheckInModel *model = [parse parseResponse:response];
    if([self checkValidationCheckIn:model.status]){
        NSString* timeCheckIn = [NSString stringWithFormat:@"You have checked in at %@", model.checkIn];
        statusCheck.text = timeCheckIn;
    }else{
        [self showAlert:kAlertErrorAlreadyCheckIn];
    }
    
}

- (void)didReceiveCheckInErrorResponse:(NSError*)error{
    
}

#pragma CheckOut Service Delegate
- (void)didReceivedCheckOutResponse:(NSString*)response{
    ctdCheckOutParser *parser = [[ctdCheckOutParser alloc]init];
    ctdResponseCheckOutModel *model = [parser parseResponse:response];
    if([self checkValidationCheckIn:model.status]){
        NSString* timeCheckOut = [NSString stringWithFormat:@"You have checked out at %@", model.checkOut];
        statusCheck.text = timeCheckOut;
    }else{
        [self showAlert:kAlertErrorAlreadyCheckOut];
    }
}

- (void)didReceiveCheckOutErrorResponse:(NSError*)error{
    
}

#pragma CheckStatus Service Delegate
- (void)didReceivedCheckStatusResponse:(NSString*)response{
    ctdCheckStatusParser *parse = [[ctdCheckStatusParser alloc]init];
    ctdResponseCheckStatusModel *model = [parse parseResponse:response];
    
    [self setPresenceId:model.presenceId];
    
    if(![model.checkIn isEqualToString:@""]){
        NSString* timeCheckIn = [NSString stringWithFormat:@"You have checked in at %@", [self changeFormatTime:model.checkIn]];
        statusCheck.text = timeCheckIn;
    }else if(![model.checkOut isEqualToString:@""]){
        NSString* timeCheckOut = [NSString stringWithFormat:@"You have checked out at %@", [self changeFormatTime:model.checkOut]];
        statusCheck.text = timeCheckOut;
    }else{
        //do any thing
    }
}

- (void)didReceiveCheckStatusErrorResponse:(NSError*)error{
    
}

- (NSString*)changeFormatTime:(NSString*)time{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"HH:mm"];
    
    NSDate *date = [dateFormatter dateFromString:time];
    
    [dateFormatter setDateFormat:@"hh:mm a"];
    
    NSString *formattedDate = [dateFormatter stringFromDate:date];
    
   return formattedDate;
    
}

- (IBAction)didAttendanceReportClicked:(id)sender{
    
}

- (IBAction)didAttendanceFormClicked:(id)sender{
    [self goToAttendanceForm];
}

-(void) goToAttendanceForm{
    ctdAttendanceFormViewController *attendanceFormViewController = [[ctdAttendanceFormViewController alloc]initWithNibName:@"ctdAttendanceFormViewController" bundle:nil];
    [self.navigationController pushViewController:attendanceFormViewController animated:YES];
}

-(void)setPresenceId:(NSString*)value{
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:kPresenceId];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)releaseDelegates{
    NSLog(@"releaseDelegates welcome view controller");
    checkInService.delegate = nil;
    checkOutService.delegate = nil;
    checkStatusService.delegate = nil;
    
    [super releaseDelegates];
}

- (void)invalidate{
    
}


@end
